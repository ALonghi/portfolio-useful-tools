export default class Utils {
    static classNames = (...classes: string[]) => {
        return classes.filter(Boolean).join(' ')
    }
}