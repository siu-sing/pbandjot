let str = `/* 1 */
{
    "_id" : ObjectId("5f4debf5761da083db3c1f5c")
}

/* 2 */
{
    "_id" : ObjectId("5f4debf5761da083db3c1f5d")
}

/* 3 */
{
    "_id" : ObjectId("5f4debf5761da083db3c1f5e")
}

/* 4 */
{
    "_id" : ObjectId("5f4debf5761da083db3c1f60")
}

/* 5 */
{
    "_id" : ObjectId("5f4debf5761da083db3c1f64")
}

/* 6 */
{
    "_id" : ObjectId("5f4debf5761da083db3c1f63")
}

/* 7 */
{
    "_id" : ObjectId("5f4debf5761da083db3c1f65")
}

/* 8 */
{
    "_id" : ObjectId("5f4debf5761da083db3c1f5f")
}

/* 9 */
{
    "_id" : ObjectId("5f4debf5761da083db3c1f62")
}

/* 10 */
{
    "_id" : ObjectId("5f4debf5761da083db3c1f61")
}

/* 11 */
{
    "_id" : ObjectId("5f98eb2556a75a0870dc0d7a")
}

/* 12 */
{
    "_id" : ObjectId("5f9aca031496216e67341ba1")
}

/* 13 */
{
    "_id" : ObjectId("5f9aca031496216e67341ba2")
}

/* 14 */
{
    "_id" : ObjectId("5f9aca031496216e67341ba3")
}

/* 15 */
{
    "_id" : ObjectId("5f9aca031496216e67341ba6")
}

/* 16 */
{
    "_id" : ObjectId("5f9aca031496216e67341ba5")
}

/* 17 */
{
    "_id" : ObjectId("5f9aca031496216e67341ba7")
}

/* 18 */
{
    "_id" : ObjectId("5f9aca031496216e67341ba8")
}

/* 19 */
{
    "_id" : ObjectId("5f9aca031496216e67341ba9")
}`

let res = str.split(" ");

let res2 = [];

let reg = /"(.*)"/g
res.forEach(e=>{
    e.startsWith("ObjectId") && e.match(reg) && res2.push( e.match(reg)[0].substring(1,25))
})



console.log(res2);