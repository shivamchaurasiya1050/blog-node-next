// Two Sum - Find two numbers that add up to target

// const arr = [12, 34, 5, 6, 7, 8, 90, 3]
// const targetValue = 9
// const findSumOfTargetValue = (arr, target) => {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 1; j < arr.length; j++) {
//             console.log(arr[i] + arr[j] == target)
//             if (arr[i] + arr[j] == target) {
//                 return [arr[i], arr[j]]
//             }
//         }
//     }
//     return null
// }
// console.log(findSumOfTargetValue(arr, targetValue))

// function getSumOfTargetValue(arr, target) {
//     const numMap = new Map()
//     for (let i = 0; i < arr.length; i++) {
//         const complement = target - arr[i]
//         if (numMap.has(complement)) {

//             return [numMap.get(complement), i]
//         }
//         numMap.set(arr[i], i)
//     }
//     return null
// }
// console.log(getSumOfTargetValue(arr, targetValue))

// const arr = [21, 34, 4, 55, 5, "shivam", "v", "f", "chaurasiya", 8, 9]
// const numArr = [];
// const strArr = [];
// const chArr = []

// for (let i = 0; i < arr.length; i++) {
//     if (typeof arr[i] === 'number') {
//         numArr.push(arr[i])
//     } else if (typeof arr[i] === "string") {
//         if (arr[i].length > 1) {
//             strArr.push(arr[i])
//         } else {
//             chArr.push(arr[i])
//         }
//     }
// }
// console.log(numArr)
// console.log(strArr)
// console.log(chArr)

// const arr = [1, 12, 34, 56, 13, 44, 88, 11, 111]
// console.log(Math.max.apply(null, arr))
// console.log(Math.max(...arr))

// let min = arr[0];
// let max = arr[0];
// let i = 0
// for (const n of arr) {
//     if (n > max) {
//         max = n
//     }
//     if (n < min) {
//         min = n
//     }

// }
// while (i < arr.length) {
//     const n = arr[i];
//     if (n > max)
//         max = n;
//     if (n < min)
//         min = n;
//     i++
// }
// console.log(min)
// console.log(max)


