let topic = "Cricket"
let parent_div = document.querySelector("#new")
let btn = document.querySelectorAll(".nav-btn")
let nav_search = document.querySelector(".nav-search")
let search = document.querySelector("#search")
let new_count = 15




let news
let news_data
async function get_data() {
    const url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=2e891df710c64a28921e4769c7265788`
    news = await fetch(url)
    news_data = await news.json()
    console.log(news_data)
    if (news_data.articles.length === 0) {
        parent_div.innerHTML = "No news found.";
        return;}
    

    if (new_count < news_data.articles.length)


        for (let i = new_count - 10; i <= new_count; i++) {

            

            if(news_data.articles[i].author === null || news_data.articles[i].title.length > 63 || news_data.articles[i].urlToImage === ""){
                continue;
            } else{

                let div = document.createElement("div")
                div.setAttribute("class", "exp");
                
                let img_url = news_data.articles[i].urlToImage
                let image = document.createElement("img")
                image.setAttribute("src", img_url)
                

                div.appendChild(image)
                parent_div.appendChild(div)
                
                let head_line =  document.createElement("p")
                head_line.textContent = news_data.articles[i].title
                head_line.setAttribute("class" , "head_line")
                div.appendChild(head_line)
                
                
                let news_line =  document.createElement("p")
                news_line.textContent = news_data.articles[i].content.slice(0, 175) + "....."
                news_line.setAttribute("class" , "news_line")
                div.appendChild(news_line)
                
                
                let publisher =  document.createElement("p")
                publisher.textContent = `Author: ${news_data.articles[i].author}`
                publisher.setAttribute("class" , "publisher")
                div.appendChild(publisher)
                
                let published_at =  document.createElement("p")
                published_at.textContent = `Published At: ${news_data.articles[i].publishedAt}`
                published_at.setAttribute("class" , "publisher")
                div.appendChild(published_at)
                
                let anchor = document.createElement("a")
                anchor.setAttribute("href" , `${news_data.articles[i].url}`)
                anchor.setAttribute("target" , `_blank`)
                
                let read_more = document.createElement("button")
                read_more.textContent = "Read More"
                read_more.setAttribute("class" , "read_more")
                
                anchor.appendChild(read_more)
                div.appendChild(anchor)
                
            }

        }



}
get_data()

btn.forEach(btns => {
    btns.addEventListener('click', () => {
        parent_div.innerHTML = ""
        topic = btns.textContent;
        get_data()
    });
});



nav_search.addEventListener("click", () => {
   
    // Trim spaces and check if the input is non-empty
    topic = search.value.trim();

    // Check if the input is not empty
    if (topic !== "") {
        parent_div.innerHTML = ""; // Clear previous results

        get_data(); // Call the function if the topic is valid
    } else {
        alert("Please Enter The Topic"); // Alert if the input is empty or only spaces
    }
});

let load_more = document.querySelector("#load-more")

load_more.addEventListener("click" , () => {
new_count += 10;
get_data()

})






