import React, { useRef, useState } from 'react'

function Dashboard() {
  const scrollRef = useRef(null);
  const purchaseScrollRef = useRef(null);

  // User details state
  const [user, setUser] = useState({
    name: 'Alex Jacob',
    email: 'abc@gmail.com',
    phone: '9191919191',

  });
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState(user);
  const [sale,setsale]=useState(20)
  const [Purchase,setPurchase]=useState(200)
  const [cart,setcart]=useState(50)



  // Dummy data arrays
  const listingCards = [
    { id: 1, title: 'Listing 1', desc: 'Description 1' },
    { id: 2, title: 'Listing 2', desc: 'Description 2' },
    { id: 3, title: 'Listing 3', desc: 'Description 3' },
    { id: 4, title: 'Listing 4', desc: 'Description 4' },
    { id: 5, title: 'Listing 5', desc: 'Description 5' },
    { id: 6, title: 'Listing 6', desc: 'Description 6' },
  ];
  const purchaseCards = [
    { id: 1, title: 'Purchase 1', desc: 'Purchased from X' },
    { id: 2, title: 'Purchase 2', desc: 'Purchased from Y' },
    { id: 3, title: 'Purchase 3', desc: 'Purchased from Z' },
    { id: 4, title: 'Purchase 4', desc: 'Purchased from A' },
    { id: 5, title: 'Purchase 5', desc: 'Purchased from B' },
  ];

  const scrollByCard = (direction, ref = scrollRef) => {
    const container = ref.current;
    if (!container) return;
    const card = container.querySelector('div > div');
    if (!card) return;
    const cardWidth = card.offsetWidth + 4; // 4px for gap-1
    container.scrollBy({
      left: direction === 'right' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    });
  };


  //clicking functionality
  const editDetails = () => {
    setForm(user); // Load current details into form
    setEditOpen(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUser(form);
    setEditOpen(false);
  };



  const listItemClicked=(id,desc)=>{
    console.log("List Item clicked: Id "+id+" Desc: "+desc)
  }

   const purchaseItemClicked=(id,desc)=>{
    console.log("Purchase  Item clicked: Id "+id+" Desc: "+desc)
  }



  return (
    <>
      <div className='w-full h-screen p-3'>
        <div className='w-full h-full bg-gray-100 rounded-[10px] overflow-hidden'>

          {/* profile section */}
        <div className='w-full h-[40%] flex'>

          <div className='h-full w-[50%] sm:w-[40%] flex p-3 '>
            {/* User photo */}
            <div className='profilephoto h-[170px] w-[170px] rounded-full'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUWIncXI5vSSiypVSkGTQ6Q_F6mUR-iuEYpQ&s" alt=""  className='h-full w-full object-cover rounded-full'/>
            </div>
          </div>

          <div className='sm:w-[60%] w-[50%] h-full p-2 flex flex-col '>
            {/* user detail */}
            <div className='w-full h-[80%] sm:flex sm:gap-[5px]'>
              <div className='w-full sm:w-[50%] h-[50%] sm:h-full  flex flex-col gap-[10px]'>
                <div className='w-full sm:w-full h-[30px] sm:h-[45px]  rounded-[10px] flex items-center pl-3'>
                  <h1 className='text-2xl font-bold'>{user.name}</h1>
                </div>
                <div className='w-full sm:w-full h-[30px] sm:h-[45px]   rounded-[10px] flex items-center pl-3'>
                  <h1 className='text-lg '>{user.email}</h1>
                </div>
                <div className='w-full sm:w-full h-[30px] sm:h-[45px]   rounded-[10px] flex items-center pl-3'>
                  <h1 className='text-lg '>{user.phone}</h1>

                </div>
              </div>

              <div className='w-full sm:w-[50%] h-[50%] sm:h-full  flex flex-col gap-[10px] pt-0'>
                <div className='w-full sm:w-full h-[30px] sm:h-[45px]   rounded-[10px] flex items-center pl-3'>
                  <h1 className='text-lg '><span className='font-bold'>Sale:</span>{sale}</h1>
                </div>
                <div className='w-full sm:w-full h-[30px] sm:h-[45px]   rounded-[10px] flex items-center pl-3'>
                  <h1 className='text-lg '><span className='font-bold'>Purchase:</span> {Purchase}</h1>
                  
                </div>
                <div className='w-full sm:w-full h-[30px] sm:h-[45px]   rounded-[10px] flex items-center pl-3'>

                  <h1 className='text-lg '><span className='font-bold'>Cart:</span> {cart}</h1>
                 
                </div>
               
              </div>

            
              
            </div>
            <div className='w-full sm:w-[40%] h-[15%] sm:h-[20%] bg-gray-300  rounded-[10px]'>
              <button className='h-full w-full cursor-pointer hover:bg-[#1447E6] hover:text-white rounded-[10px] transition-all duration-300'
              onClick={editDetails}
              >
                Edit Details
              </button>

            </div>

          </div>


        </div>




          {/* Listing Section */}
        <div className='w-full h-[30%] px-2'>
          <div className='h-[10%] w-full'>
            <h1 className='font-bold'>My Listing</h1>
          </div>

          <div className='relative h-[90%] w-full mt-2'>
          {/* Left Arrow */}
          {listingCards.length > 4 && (
                <button
                  className="hidden sm:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 bg-white/80 hover:bg-green-600 text-green-800 rounded-full shadow-lg transition-all cursor-pointer"
                  onClick={() => scrollByCard('left')}
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
              )}

              {/* Scrollable Cards */}
              <div
                ref={scrollRef}
                className='h-full w-full overflow-x-auto scrollbar-hide'
              >
                <div className='flex h-full gap-1'>
                  {listingCards.map((item) => (
                    <div
                      key={item.id}
                      className='h-[90%] w-1/3 sm:w-1/4 flex-shrink-0 bg-gray-300 rounded-[20px] flex flex-col items-center justify-center p-2 hover:bg-gray-400 transition-all duration-300 cursor-pointer'
                      title='Click to see details'
                      onClick={() => listItemClicked(item.id, item.desc)}
                      
                    >
                      <div className="text-lg font-bold">{item.title}</div>
                      <div className="text-sm text-gray-700">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              {listingCards.length > 4 && (
                <button
                  className="hidden sm:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 bg-white/80 hover:bg-green-400 text-green-800 rounded-full shadow-lg transition-all cursor-pointer"
                  onClick={() => scrollByCard('right')}
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              )}
            </div>
          </div>




          {/* My purchase */}
        <div className='w-full h-[30%] px-2'>
          <div className='h-[10%] w-full'>
            <h1 className='font-bold'>My Purchase</h1>
          </div>
          <div className='relative h-[90%] w-full mt-2'>
          {/* Left Arrow */}
          {purchaseCards.length > 4 && (
                <button
                  className="hidden sm:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 bg-white/80 hover:bg-green-600 text-green-800 rounded-full shadow-lg transition-all cursor-pointer"
                  onClick={() => scrollByCard('left', purchaseScrollRef)}
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
              )}

              {/* Scrollable Cards */}
              <div
                ref={purchaseScrollRef}
                className='h-full w-full overflow-x-auto scrollbar-hide'
              >
                <div className='flex h-full gap-1'>
                  {purchaseCards.map((item) => (
                    <div
                      key={item.id}
                      className='h-[90%] w-1/3 sm:w-1/4 flex-shrink-0 bg-yellow-200 rounded-[20px] flex flex-col items-center justify-center p-2 cursor-pointer hover:bg-yellow-500 transition-all duration-300'
                      title='Click to see details'
                      onClick={() => purchaseItemClicked(item.id, item.desc)}
                    >
                      <div className="text-lg font-bold">{item.title}</div>
                      <div className="text-sm text-gray-700">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              {purchaseCards.length > 4 && (
                <button
                  className="hidden sm:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 bg-white/80 hover:bg-green-400 text-green-800 rounded-full shadow-lg transition-all cursor-pointer"
                  onClick={() => scrollByCard('right', purchaseScrollRef)}
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              )}
            </div>
          </div>

        </div>
        </div>

        {/* Edit Form Modal */}
        {editOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <form
              className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md flex flex-col gap-4"
              onSubmit={handleFormSubmit}
            >
              <h2 className="text-xl font-bold mb-2">Edit Details</h2>
              <label className="flex flex-col">
                Name:
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  className="border rounded px-2 py-1 mt-1"
                  required
                />
              </label>
              <label className="flex flex-col">
                Email:
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  className="border rounded px-2 py-1 mt-1"
                  required
                />
              </label>
              <label className="flex flex-col">
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleFormChange}
                  className="border rounded px-2 py-1 mt-1"
                  required
                />
              </label>
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
                  onClick={() => setEditOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

    </>
  )
}

export default Dashboard