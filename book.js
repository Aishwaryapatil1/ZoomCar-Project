
getdata();
async function getdata(){
 try{
  let city=JSON.parse(localStorage.getItem("city"));

  // let res=await fetch(`http://localhost:5000/${city}`);

  let res=await fetch(`http://localhost:5000/cars/${city}`);
// >>>>>>> f28cb4ff8c92ca9e03eeac609898be88d58268f5
  let data=await res.json();
  console.log(data)
  displayData(data);
 }catch(err){
   console.log("err:",err);
 }

}
getdata()

// <<<<<<< HEAD

// =======
// >>>>>>> f28cb4ff8c92ca9e03eeac609898be88d58268f5
// displayData(carDataArray);
async function displayData(carDataArray){
  document.getElementById("cars").innerText = null;

  

  carDataArray.map(async function(elem){

    let car_box = document.createElement("div");
    car_box.id="car_box"

    let left_div = document.createElement("div");
    let image = document.createElement("img");
    image.src=elem.carimage;
    left_div.append(image)
    left_div.id="left_div"


    let middle_div = document.createElement("div");
    let pickup = document.createElement("div");
    pickup.innerText= elem.carname;
    pickup.id="pickup_div"
    middle_div.id="middle_div"

    let title_div = document.createElement("div");
    title_div.innerText = elem.transmission+" .   "+elem.fuel+" .    "+elem.seates+" seats";
    let rating_div = document.createElement("div");
    rating_div.innerText = elem.driven+" Kms driven"

    middle_div.append(pickup,title_div,rating_div)

    let right_div = document.createElement("div");
    right_div.id="right_div"
     
     
    let price = document.createElement("p");
    price.innerText = "₹ "+elem.price;
    let button = document.createElement("button")
    button.innerHTML= "Book now"

    button.addEventListener("click",async ()=>{
// >>>>>>> f28cb4ff8c92ca9e03eeac609898be88d58268f5
      let start = document.getElementById("start").value;
      let end = document.getElementById("end").value;
      let address=document.getElementById("place").value;
      let token=(localStorage.getItem("token"));
      if(address=="" || start=="" || end==""){
       
        console.log(address,start,end);
        alert("Please fill all the Details")
      }
      else{
        try{
          let bookingdata={
            address:address,
            startdate:start,
            enddate:end,
            price:elem.price,
            carid:elem._id,
          }
          booking_json_data=JSON.stringify(bookingdata);
          let res=await fetch("http://localhost:5000/bookings",{
                    method:"POST",

             body:booking_json_data,


              headers:{
                "Content-Type":'application/json',
                authorization:token
              },
  });
  let data=await res.json();
  console.log(data);
 localStorage.setItem("bookingid",JSON.stringify(data._id));
        // window.location.href = "checkout.html"

        }catch(err){
          console.log("err:",err);
        }
        
        
      }
      
    })
    right_div.append(price,button)

    car_box.append(left_div,middle_div,right_div)
    document.getElementById("cars").append(car_box)

    

    
   
});


}







// try{
//   let login_data={
//       email:email,
//       fullname:username,
//       password:password,
//       mobilenumber:mobile,
//       city:city,

//   },

// //         "password": "secret",
// //   "username": "masai-school"
//  login_json_data=JSON.stringify(login_data);
//   let res=await fetch("https://localhost:5000/register",{
//       method:"POST",

//       body:login_json_data,


//       headers:{
//           "Content-Type":'application/json',
//       },
//   });
//   let data=await res.json();