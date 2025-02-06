function longestIncreasingSubsequence(nums) {
    if (nums.length === 0) {
        return [[], 0];
    }

    let lis = [];

    for (let num of nums) {
        let pos = binarySearch(lis, num);

        if (pos === lis.length) {
            lis.push(num);
        } else {
            lis[pos] = num;
        }
    }

    return [lis, lis.length];
}

function binarySearch(arr, target) {
    let low = 0;
    let high = arr.length;

    while (low < high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
}

let nums = [10, 9, 2, 5, 3, 7, 101, 18];
let [lis, length] = longestIncreasingSubsequence(nums);
console.log("Longest Increasing Subsequence:", lis);
console.log("Length of LIS:", length);
