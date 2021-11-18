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
    { Item: 'Beef Burger' },
]

function pesan(menu, order) {
    let output = 0
    for (let i = 0; i < menu.length; i++) {
        for (let j = 0; j < order.length; j++) {

            if (menu[i].Item === order[j].Item) {
                output += menu[i].Price


            }
        }
    }

    return output
}
// total price

function paket(menu, order) {
    let main = false
    let sides = false
    let beverage = false
    let mainCount = 0
    let sidesCount = 0
    let beverageCount = 0

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
                output -= 10000
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
    return output

}
// auto paket
function buy1(menu, order) {
    let output = paket(menu, order)
    let beefBurgercount = 0
    for (let i = 0; i < order.length; i++) {
        if (order[i].Item === 'Beef Burger') {
            beefBurgercount++
        }
    }
    if (beefBurgercount >= 2) {
        output -= 30000
    }
    return output
}
// buy1 get 1 burger
function cashback(menu, order) {
    let output = buy1(menu, order)

    if (output >= 40000 && output < 85000) {
        output -= 10000
    }
    else if (output >= 85000) {
        output -= 25000
    }
    return output
}
console.log(cashback(list, selection))
// cashback 40k/ 85k
