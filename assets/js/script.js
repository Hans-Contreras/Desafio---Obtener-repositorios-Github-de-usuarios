//Hans, Fernanda, Sihomara y Luis Cervela

//#1 
async function request(url){
    try{

        const resp = await fetch(url).then(response => response.json())
        return resp
    }catch(error){
        console.log(error)
    }
}

async function getUser(user){
    return await request(`http://api.github.com/users/${user}`);
}
async function getRepo(user,page,perPage){
    return await request(`https://api.github.com/users/${user}/repos?page=${page}&per_page=${perPage}`)
}

//#2
let btn = $('button')

btn.on('click',(e)=>{
    e.preventDefault();
    let user = $('#nombre').val()
    let page = $('#pagina').val()
    let perPage = $('#repoPagina').val()


//#3
    Promise.all([getUser(user), getRepo(user, page, perPage)]).then(results =>{
    printHtml(results)
    })
})

//#4
function printHtml(data){
    let userInfo = document.createElement('div')
    let repoInfo = document.createElement('div')
    let userTitle = document.createElement('h2')
    let repoTitle = document.createElement('h2')

    userTitle.innerText = 'Información del usuario'
    repoTitle.innerText = 'Información de los repositorios'


    let userUl = document.createElement('ul')
    let repoUl = document.createElement('ul');


    ['name', 'login', 'public_repos', 'location', 'type'].forEach(element => {
        let li = document.createElement('li')
        let value = data[0][element] || 'No se ha definido'
        li.innerHTML = `<strong>${element}: </strong> ${value}`

        userUl.appendChild(li)
    });

    data [1].forEach(element => {
        let li = document.createElement('li')
        li.innerHTML = `${element.name}`

        repoUl.appendChild(li)
    })


    userInfo.className = "userInfo col-6"
    repoInfo.className = "repoInfo col-6"

    userInfo.appendChild(userTitle)
    userInfo.appendChild(userUl)
    repoInfo.appendChild(repoTitle)    
    repoInfo.appendChild(repoUl)


    $('#resultados').empty() 
    $('#resultados').append(userInfo) 
    $('#resultados').append(repoInfo)

    }
