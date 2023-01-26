export default class DateUtils {

    static getCurrentTimestamp = (): string => {
        return new Date().getTime().toString()
    }

}