function profitGain(percentage, year, amount) {
    let gained_amount = amount;
    for (let index = 0; index < year; index++) {
        const gain = (gained_amount * percentage / 100);

        gained_amount += gain;

    }
    return Math.round(gained_amount);
}
