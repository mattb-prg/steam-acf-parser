const parse = require('./index')
const fs = require('fs')

const validFile = fs.readFileSync('./appmanifest/good.acf', {
    encoding: 'utf8'
})
const badFile = fs.readFileSync('./appmanifest/bad.acf', {
    encoding: 'utf8'
})

function createManifest(data){
    return `"AppState"
        {
            ${data}
        }
    `
}

test('gets a single string value', () => {
    const data = parse(createManifest(`"testProp"\t\t"test value"`))
    expect(data).toMatchObject({
        AppState: {
            testProp: "test value"
        }
    })
})

test('gets a single object value', () => {
    const data = parse(createManifest(`"testProp"\n\t{\t"objProp"\t\t"obj val"\t}`))
    expect(data).toMatchObject({
        AppState: {
            testProp: {
                objProp: "obj val"
            }
        }
    })
})

test('gets multiple values', () => {
    const data = parse(createManifest(`"testProp"\t\t"test value"\n\t"testObj"\n\t{\t"objProp"\t\t"obj val"\t}`))
    expect(data).toMatchObject({
        AppState: {
            testProp: "test value",
            testObj: {
                objProp: "obj val"
            }
        }
    })
})

test('string values are correct', () => {
    const data = parse(validFile)
    expect(data.AppState).toHaveProperty('appid', '47410')
    expect(data.AppState).toHaveProperty('LastOwner', '12345')
})

test('object values are correct', () => {
    const data = parse(validFile)
    expect(data.AppState).toHaveProperty('UserConfig')
    expect(data.AppState.UserConfig).toMatchObject({
        language: 'english'
    })
})

test('error on unquoted property', () => {
    expect(() => {
        parse(createManifest(`testProp\t\t"test value"`))
    }).toThrow()
})

test('error on unquoted value', () => {
    expect(() => {
        parse(createManifest(`"testProp"\t\ttest value`))
    }).toThrow()
})

test('correctly parses a valid .acf file', () => {
    expect(() => {
        parse(validFile)
    }).not.toThrow()
})

test('fails on invalid file', () => {
    expect(() => {
        parse(badFile)
    }).toThrow()
})