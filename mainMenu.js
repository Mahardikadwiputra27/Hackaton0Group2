

let list = [
    { Item: 'Beef Burger', Price: 30_000, Type: 'Main Course' },
    { Item: 'Chicken Original', Price: 15_000, Type: 'Main Course' },
    { Item: 'Chicken Spicy', Price: 16_000, Type: 'Main Course' },
    { Item: 'French Fries', Price: 10_000, Type: 'Sides' },
    { Item: 'Chicken Burger', Price: 15_000, Type: 'Main Course' },
    { Item: 'Rice', Price: 6_000, Type: 'Sides' },
    { Item: 'Cola', Price: 8_000, Type: 'Beverage' },
    { Item: 'Lemon Tea', Price: 8_000, Type: 'Beverage' },
]

let selection = [
    { Item: 'French Fries' },
    { Item: 'Rice' },
    { Item: 'Cola' },
    { Item: 'Lemon Tea' },
    { Item: 'Lemon Tea' },
    { Item: 'Beef Burger' },
    
]

function cartVisual(menu, order)     {
    let output = []

    for (let i = 0; i < menu.length; i++) {
        for (let j = 0; j < order.length; j++) {
            if (order[j].Item === menu[i].Item) {
                if (!output[menu[i]]) {
                    output.push(menu[0])
                    output[menu[i]].Quantity = 1
                    delete output[menu[i]].Type
                }
                else {
                    output[menu[i]].Quantity++
                }
            }
        }
    }

    return output

}
console.log(list, selection)





function pesan(menu, order) {
    let output = {}
    let totalHarga = 0
    for (let i = 0; i < menu.length; i++) {
        for (let j = 0; j < order.length; j++) {
            if (menu[i].Item === order[j].Item) {
                totalHarga += menu[i].Price
            }
        }
    }
    output.totalHarga = totalHarga
    return output
}
// console.log(pesan(list,selection))

function paket(menu, order) {
    let main = false
    let sides = false
    let beverage = false
    let mainCount = 0
    let sidesCount = 0
    let beverageCount = 0
    let countPaket = 0
    let result = {}
    let diskonPaket = 10000

    let output = pesan(menu, order)
    for (let i = 0; i < menu.length; i++) {
        for (let j = 0; j < order.length; j++) {
            if (order[j].Item === menu[i].Item && menu[i].Type === 'Main Course' && main === true) {
                mainCount++
            }
            else if (order[j].Item === menu[i].Item && menu[i].Type === 'Main Course' && main === false) {
                main = true
            }


            else if (order[j].Item === menu[i].Item && menu[i].Type === 'Sides' && sides === true) {
                sidesCount++
            }
            else if (order[j].Item === menu[i].Item && menu[i].Type === 'Sides' && sides === false) {
                sides = true
            }


            else if (order[j].Item === menu[i].Item && menu[i].Type === 'Beverage' && beverage === true) {
                beverageCount++
            }
            else if (order[j].Item === menu[i].Item && menu[i].Type === 'Beverage' && beverage === false) {
                beverage = true
            }


            if (main === true && sides === true && beverage === true) {
                output.totalHarga -= diskonPaket
                countPaket++
                main = false
                sides = false
                beverage = false
                if (mainCount > 0) {
                    main = true
                    mainCount -= 1
                }
                if (sidesCount > 0) {
                    sides = true
                    sidesCount -= 1
                }
                if (beverageCount > 0) {
                    beverage = true
                    beverageCount -= 1
                }
            }
        }
    }
    if (countPaket > 0) {
        output.hargaAsli = output.totalHarga + (diskonPaket * countPaket)
        output.message = `Selamat anda mendapatkan potongan sebanyak ${diskonPaket * countPaket} karena membeli paket ${countPaket} kali!`
    }
    return output
}
// auto paket
// console.log(paket(list, selection))

function buy1(menu, order) {
    let output = paket(menu, order)
    let beefBurgercount = 0
    let countbuy1 = 0
    let promoBuy1 = 30000
    for (let i = 0; i < order.length; i++) {
        if (order[i].Item === 'Beef Burger') {
            beefBurgercount++
        }
    }
    if (beefBurgercount >= 2) {
        output.totalHarga -= promoBuy1
        countbuy1++
    }


    if (!output.message && countbuy1) {
        output.message = `Selamat anda mendapatkan Beef Burger kedua tanpa biaya!`
    }
    else if (output.message && countbuy1) {
        output.message += ` Anda juga mendapatkan Beef Burger kedua tanpa biaya!`
    }
    if (!output.hargaAsli) {
        output.hargaAsli = output.totalHarga + promoBuy1
    }

    return output
}
// buy1 get 1 burger
// console.log(buy1(list, selection))

function cashback(menu, order) {
    let output = buy1(menu, order)
    let cashback1 = 0
    let cashback2 = 0
    let cashback1cut = 10000
    let cashback2cut = 25000

    if (output.totalHarga >= 40000 && output.totalHarga < 85000) {
        output.totalHarga -= cashback1cut
        cashback1++
    }
    else if (output.totalHarga >= 85000) {
        output.totalHarga -= cashback2cut
        cashback2++
    }
    if (!output.message && cashback1cut) {
        output.message = `Selamat anda mendapatkan cashback sebanyak ${cashback1cut} karena transaksi minimal 40000!`
    }
    else if (!output.message && cashback2cut) {
        output.message = `Selamat anda mendapatkan cashback sebanyak ${cashback2cut} karena transaksi minimal 85000!`
    }
    else if (output.message) {
        if (cashback1cut) {
            output.message += ` Ada juga potongan cashback berjumlah ${cashback1cut} dengan transaksi minimal 40000!`
        }
        else if (cashback2cut) {
            output.message += ` Ada juga potongan cashback berjumlah ${cashback2cut} dengan transaksi minimal 85000!`
        }
    }
    if (!output.hargaAsli) {
        if (cashback1cut) {
            output.hargaAsli = output.totalHarga + cashback1cut
        }
        else if (cashback2cut) {
            output.hargaAsli = output.totalHarga + cashback2cut
        }
    }
    return output
}
console.log(cashback(list, selection))
// cashback 40k/ 85k



// cashback 40k/ 85k
