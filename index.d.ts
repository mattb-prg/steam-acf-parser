declare function parseAcf(acfStr: string): parseAcf.AcfData

declare namespace parseAcf {
    interface AcfData {
        AppState: {
            [prop: string]: any
            name: string
            appid: string
            buildid: string
            LastUpdated: string
            installdir: string
        }
    }
}

export = parseAcf