export default function getTime(){
    let message = '';
    let nowhour = new Date().getHours();
    if (nowhour <= 9) {
        message = '早上好';
    }
    else if (nowhour <= 12) {
        message = '上午好'
    }
    else if (nowhour <= 18) {
        message = '下午好'
    }
    else {
        message = '晚上好'
    }
    return message;
}