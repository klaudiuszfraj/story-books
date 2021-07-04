import moment from 'moment';

export const formatDate = (date: string, format:string) => moment(date).format(format);
export const truncate = (str:string, len:number) => {
    if (str.length > len && str.length > 0) {
        let newStr = str + ' ';
        newStr = str.substr(0, len);
        newStr = str.substr(0, newStr.lastIndexOf(' '));
        newStr = newStr.length > 0 ? newStr : str.substr(0, len);
        return newStr + '...';
    }
    return str;
};
export const stripTags = (htmlString:string) => htmlString.replace(/<(?:.|\n)*?>/gm, '')
