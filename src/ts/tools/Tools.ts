export default class Tools {
    public static checkGistId(gistId: string): boolean {
        // TODO: 逻辑错误
        if (gistId == '' || gistId == null) return false
        if (gistId.length != 32) return false
        if (!localStorage.getItem('gistId')) return false
        return true
    }
}