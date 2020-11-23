var axios = require('axios');

let idArr = [
    '5f4debf5761da083db3c1f5c',
    '5f4debf5761da083db3c1f5d',
    '5f4debf5761da083db3c1f5e',
    '5f4debf5761da083db3c1f60',
    '5f4debf5761da083db3c1f64',
    '5f4debf5761da083db3c1f63',
    '5f4debf5761da083db3c1f65',
    '5f4debf5761da083db3c1f5f',
    '5f4debf5761da083db3c1f62',
    '5f4debf5761da083db3c1f61',
    '5f98eb2556a75a0870dc0d7a',
    '5f9aca031496216e67341ba1',
    '5f9aca031496216e67341ba2',
    '5f9aca031496216e67341ba3',
    '5f9aca031496216e67341ba6',
    '5f9aca031496216e67341ba5',
    '5f9aca031496216e67341ba7',
    '5f9aca031496216e67341ba8',
    '5f9aca031496216e67341ba9'
]

idArr.forEach(id=>{
    var data = JSON.stringify({
        "group": `5f85217cf888b1676b7da86d`
    });
    
    var config = {
        method: 'post',
        url: `http://localhost:6969/api/groups/workouts/${id}`,
        headers: {
            'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY0OTA2ODZjZmE2NDExOTUxNjQ1OTcyIn0sImlhdCI6MTU5ODcxNDY3NSwiZXhwIjoxOTU4NzE0Njc1fQ.1pRFvyN0bV4dZIlQmi37cQoKeYAbwJCBwcrbAM-r9_k',
            'Content-Type': 'application/json'
        },
        data: data
    };
    
    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
})