export const currencyFormat = (num) => {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const numberFormat = (num) => {
    if (isNaN(num)) {
        return 'Invalid number';
    }
    const fixedNum = Number(num).toFixed();
    return fixedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}