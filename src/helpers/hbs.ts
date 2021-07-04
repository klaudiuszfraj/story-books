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
export const stripTags = (htmlString:string) => htmlString.replace(/<(?:.|\n)*?>/gm, '');


//todo user any
export const editIcon = (storyUser: { _id: { toString: () => any; }; }, loggedUser: { _id: { toString: () => any; }; }, storyId:string, floating = true) => {
    if (storyUser._id.toString() == loggedUser._id.toString()) {
        if (floating) {
            return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
        } else {
            return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
        }
    } else {
        return ''
    }
};

export const select = function (this: any, selected: any, options: any, ) {
    return options
        .fn(this)
        .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
        )
        .replace(
            new RegExp('>' + selected + '</option>'),
            ' selected="selected"$&'
        )
}