interface Obj {
    [prop: string]: string | Obj

}

interface AcfData {
    AppState: {
        [prop: string]: string | Obj
        name?: string
        appid?: string
        buildid?: string
        LastUpdated?: string
    }
}

declare function parseAcf(acfStr: string): AcfData

export = parseAcf