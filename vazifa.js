// // 1 - misol

const { log } = require('console')

// function sanoq(a,arr){
// 	let natija = []
// 	for(let i of arr) {
// 		if(i == a){
// 			natija.push(i)
// 		}
// 	}
// 	return natija.length
// }

// let a = [1, 2, 2, 3, 2]
// console.log(sanoq(2,a));

// // -----------------------------------------------------------------------------------------------------

// // 2 - misol

// function harorat(c){
// 	return c * 1.8 + 32
// }

// let c = 0

// console.log(harorat(c));

// // -----------------------------------------------------------------------------------------------------

// // 3 - misol

// function sanoq(arr) {
// 	let musbat = 0
// 	let manfiy = 0
// 	for (let i of arr) {
// 		if (i > 0) {
// 			musbat += 1
// 		} else if (i < 0) {
// 			manfiy += 1
// 		}
// 	}
// 	return `Manfiy sonlar ${manfiy} va musbat sonlar ${musbat}`
// }

// let arr = [1,-3, -2, 4, -5]
// console.log(sanoq(arr))

// // -----------------------------------------------------------------------------------------------------

// // 4 - misol

// function ortiqchaBelgi(soz){
// 	return soz.replace(',','')
// }

// let soz = 'Salom, dunyo'
// console.log((ortiqchaBelgi(soz)));

// // -----------------------------------------------------------------------------------------------------

// // 5 - misol

// function sanoq(arr) {
// 	let natija = []
// 	for (let i = 0; i < arr.length; i++) {
// 		if (i % 2 == 1) {
// 			natija.push(arr[i])
// 		}
// 	}
// 	return natija
// }

// let arr = [10, 20, 30, 40, 50]
// console.log(sanoq(arr))

// // -----------------------------------------------------------------------------------------------------

// // 6 - misol

// function camelCase(str) {
// 	let sozlar = str.split(' ')
// 	let natija = ''
// 	for (let i = 0; i < sozlar.length; i++) {
// 		let s = sozlar[i]
// 		natija += s[0].toUpperCase() + s.slice(1)
// 	}
// 	return natija
// }

// console.log(camelCase('salom dunyo'))

// // ------------------------------------------------------------------------------------------------

// 7 - misol

// function ikkiSon(a, b) {
// 	let natija = []
// 	for (let i = a + 1; i < b; i++) {
// 		natija.push(i)
// 	}
// 	return natija
// }

// let a = 3
// let b = 7
// console.log(ikkiSon(a, b))

// // ------------------------------------------------------------------------------------------------

// // 8 - misol

// function kabisa(yil) {
// 	let natija = ''
// 	if (yil % 4 == 0 && (yil % 100 != 0 || yil % 400 == 0)) {
// 		natija = 'Bu yil kabisa yili'
// 	} else {
// 		natija = 'Bu yil kabisa yili emas'
// 	}

// 	return natija
// }

// let yil = 2024
// console.log(kabisa(yil))

// // ------------------------------------------------------------------------------------------------

// // 9 - misol

// function engKopTakrorlangan(arr) {
// 	let obj = {}
// 	let maxCount = 0
// 	let maxElem = null

// 	for (let i of arr) {
// 		obj[i] = (obj[i] || 0) + 1

// 		if (obj[i] > maxCount) {
// 			maxCount = obj[i]
// 			maxElem = i
// 		}
// 	}

// 	return maxElem
// }

// let arr = [1, 2, 2, 3, 2, 1]
// console.log(engKopTakrorlangan(arr))

// // ------------------------------------------------------------------------------------------------

// // 10 - misol

// function dublicat(arr) {
// 	for (let i = 0; i < arr.length; i++) {
// 		if (arr[i] == arr[i + 1]) {
// 			return true
// 		}
// 	}
// 	return false
// }

// let arr1 = [1, 2, 2, 3]
// let arr2 = [1, 2, 3, 4]
// console.log(dublicat(arr1))
// console.log(dublicat(arr2))
