/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import noteBookLogo from './assets/Notebook.svg'
// import viteLogo from '/vite.svg'
import './App.css'


//buat data dummy start
const groceryItems = [
  // {
  //   id: 1,
  //   name: 'Susu Kental Manis',
  //   quantity: 5,
  //   checked: true
  // },
  // {
  //   id: 2,
  //   name: 'Masako',
  //   quantity: 5,
  //   checked: true
  // }

]
//buat data dummy end

export default function App() {
  const [items, setItem] = useState(groceryItems) //[{ }]

  function handleAddItem(item) {
    // immutability , buat data baru dulu , baru replace ke lama
    setItem((prev) => [...prev, item])
    // setItem([...item], item)
    //atau
    // const newItem = [...items, item]
    // setItem(newItem)

    // immutability , buat data baru dulu , baru replace ke lama

  }

  function handleDeleteItem(name) {
    setItem((items) => items.filter((item) => {
      return item.name !== name
    })) 


  }

  function handleCheckedItem(id) {
    alert('checked')

    //lakukan map , agar stiap di klik , property checked jadi !checked dengan kondisi id item yg diklik harus sama dengan item.id
    setItem((items) => items.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item
    }))
    //lakukan map , agar stiap di klik , property checked jadi !checked
  }

  function handleClearItem() {
    //hapus semua item
    setItem([])
    setItem((items) => items.filter((item) => {
      return false
    }))
  }


  return (
    <>
      <Header />
      <Form onAddItem={handleAddItem} />
      {/* Kirim item ke grocerylist  */}
      <GroceryList item={items} onChecked={handleCheckedItem} onDeleteItem={handleDeleteItem} onClearItem={handleClearItem} />
      <Footer item={items} />
    </>
  )
}



function Header() {
  return (
    <header className="bg-emerald-900 lg:py-15 pt-10">
      <nav className="text-center lg:flex lg:flex-wrap justify-center items-center">
        <h1 className="font-medium tracking-widest hp:text-5xl  sm:text-5xl lg:text-6xl text-white font-['Pacifico']">Catatan <span className="hp:block sm:inline-block">Belanjaku</span></h1>
        <img src={noteBookLogo} alt='Notebook' className="hp:mt-3 hp:w-28 sm:w-32 md:w-36 lg:w-24 mx-auto lg:mx-0"></img>
      </nav>
    </header>
  )
}

function Form({ onAddItem }) {
  //generate angka 1-20 untuk select number Start//
  const generateNum = [...Array(10)].map((_, i) => (
    <>
      <option value={i + 1}>{i + 1}</option>
    </>
  ))
  //generate angka 1-20 untuk select number End//

  // buat state untuk menangani nama Start
  const [name, setName] = useState('')
  // buat state untuk menangani nama End

  // buat state untuk menangani quantity Start
  const [quantity, setQuantity] = useState('1')
  // buat state untuk menangani quantity End


  function handleSubmit(e) {
    e.preventDefault()
    // beri guard , agar saat input kosong stop
    if (!name) return
    // beri guard , agar saat input kosong stop

    alert('Barang masuk !')

    // simpan nilai state ke variabel
    const newItem = {
      id: Date.now(),
      name,
      quantity,
      checked: false
    }
    console.log(newItem)

    // jalanin fungsi di onadditem
    onAddItem(newItem)
    // jalanin fungsi di onadditem

    // setelah input , bersihkan inputan
    setName('')
    setQuantity('1')
    // setelah input , bersihkan inputan
  }




  return (
    <section id="input-barang" className="bg-amber-500  py-4 lg:py-7 items-center hp:pl-4  sm:pl-11 lg:pl-0 font-['Poppins']">
      <form onSubmit={handleSubmit} action="" className="hp:grid grid-cols-2 lg:flex flex-wrap justify-center items-center">
        <p className="font-medium text-stone-600 hp:text-base sm:text-xl lg:text-lg mb-2 lg:mr-5 max-w-xs lg:max-w-full col-start-1">Hari ini belanja apa kita?</p>
        <div className=" bg-amber-100 text-stone-600 h-10 rounded-2xl max-w-20 py-5 lg:mr-2 col-start-1 col-end-2 row-start-2 row-end-3 flex justify-center items-center">
          <select value={quantity} onChange={(e) => { setQuantity(Number(e.target.value)) }} name="number" id="number-select" className='lg:px-2 hp:px-4 justify-center flex focus:outline-none active:outline-none truncate'>
            {generateNum}
          </select>
        </div>
        <div className=" bg-amber-100 h-10  sm:max-w-2xs xl:max-w-3xs 2xl:max-w-2xs rounded-2xl py-2 truncate hp:px-5 sm:px-10 lg:mr-4 col-start-1 col-end-2">
          <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" name="" id="" placeholder='Nama barang' className='focus:outline-none active:outline-none cursor-pointer' />
        </div>
        <div className="bg-emerald-800 rounded-2xl flex items-center justify-center hp:w-20 sm:w-60 md:w-3xs lg:w-40 mx-auto lg:mx-0 px-10 py-3 col-start-2 col-end-3 sm:row-start-2 hp:row-start-3">
          <button onClick={handleSubmit} type="button" className='text-white hp:text-base sm:text-lg lg:text-base font-medium'>Tambah</button>
        </div>
      </form>

    </section>
  )
}

function GroceryList({ item, onChecked, onDeleteItem, onClearItem }) {

  // buat state untuk sort
  const [sortBy, setSortBy] = useState('input')
  // buat state untuk sort


  // buat pengkondisian
  let sortedItems;
  if (sortBy === 'input') {
    sortedItems = item
  }

  if (sortBy === 'name') {
    sortedItems = item.slice().sort((a, b) => a.name.localeCompare(b.name))
  }

  if (sortBy === 'checked') {
    sortedItems = item.slice().sort((a, b) => a.checked - b.checked)
  }

  // buat pengkondisian



  return (
    <>
      <section id="" className="bg-[url(./assets/paper-bg.jpg)] bg-size-[100%_290px] flex flex-wrap  font-['Poppins']" >
        <div className="List-item py-2 w-lg h-[29.78rem] mx-auto text-center">
          <ul>
            {/* pindahkan ke satu komponen */}
            {/* lakukan pengulangan dengan map untuk item */}
            {sortedItems.map((item) => (
              <Item key={item.id} item={item} onChecked={onChecked} onDeleteItem={onDeleteItem} />
            ))}
          </ul>
        </div>
      </section>
      <section id="" className="flex py-3 justify-center bg-lime-700 text-dark lg:text-base">
        <div className="flex flex-wrap gap-5 action justify-center">
          <div className="sm:max-w-2/3  bg-amber-100 rounded-full py-2 px-5">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='focus:outline-none'>
              <option value="input">Urutkan berdasarkan urutan input</option>
              <option value="name">Urutkan berdasarkan nama barang</option>
              <option value="checked">Urutkan berdasarkan ceklis</option>
            </select>
          </div>
          <button onClick={onClearItem} type="button" className='py-2 px-4 rounded-full bg-amber-100 max-w-[32%] hp:max-w-[39%]'>Bersihkan Daftar</button>
        </div>
      </section>
    </>
  )
}

function Item({ item, onChecked, onDeleteItem }) {
  return (
    <li className="mb-2 flex justify-center items-center">
      <label onClick={() => { onChecked(item.id) }} htmlFor="toggle" className="">
        <input type="checkbox" name="" id="toggle" className='inline-block mr-4 scale-150' />
        <p style={item.checked ? { textDecoration: 'line-through' } : {}} className="font-medium text-black text-2xl inline-block">{item.quantity} {item.name}</p>
      </label>
      <span className="" onClick={() => { onDeleteItem(item.name) }}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="40" viewBox="0 0 100 100">
          <path fill="#f37e98" d="M25,30l3.645,47.383C28.845,79.988,31.017,82,33.63,82h32.74c2.613,0,4.785-2.012,4.985-4.617L75,30"></path><path fill="#f15b6c" d="M65 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S65 36.35 65 38zM53 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S53 36.35 53 38zM41 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S41 36.35 41 38zM77 24h-4l-1.835-3.058C70.442 19.737 69.14 19 67.735 19h-35.47c-1.405 0-2.707.737-3.43 1.942L27 24h-4c-1.657 0-3 1.343-3 3s1.343 3 3 3h54c1.657 0 3-1.343 3-3S78.657 24 77 24z"></path><path fill="#1f212b" d="M66.37 83H33.63c-3.116 0-5.744-2.434-5.982-5.54l-3.645-47.383 1.994-.154 3.645 47.384C29.801 79.378 31.553 81 33.63 81H66.37c2.077 0 3.829-1.622 3.988-3.692l3.645-47.385 1.994.154-3.645 47.384C72.113 80.566 69.485 83 66.37 83zM56 20c-.552 0-1-.447-1-1v-3c0-.552-.449-1-1-1h-8c-.551 0-1 .448-1 1v3c0 .553-.448 1-1 1s-1-.447-1-1v-3c0-1.654 1.346-3 3-3h8c1.654 0 3 1.346 3 3v3C57 19.553 56.552 20 56 20z"></path><path fill="#1f212b" d="M77,31H23c-2.206,0-4-1.794-4-4s1.794-4,4-4h3.434l1.543-2.572C28.875,18.931,30.518,18,32.265,18h35.471c1.747,0,3.389,0.931,4.287,2.428L73.566,23H77c2.206,0,4,1.794,4,4S79.206,31,77,31z M23,25c-1.103,0-2,0.897-2,2s0.897,2,2,2h54c1.103,0,2-0.897,2-2s-0.897-2-2-2h-4c-0.351,0-0.677-0.185-0.857-0.485l-1.835-3.058C69.769,20.559,68.783,20,67.735,20H32.265c-1.048,0-2.033,0.559-2.572,1.457l-1.835,3.058C27.677,24.815,27.351,25,27,25H23z"></path><path fill="#1f212b" d="M61.5 25h-36c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h36c.276 0 .5.224.5.5S61.776 25 61.5 25zM73.5 25h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5S73.776 25 73.5 25zM66.5 25h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S66.776 25 66.5 25zM50 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v25.5c0 .276-.224.5-.5.5S52 63.776 52 63.5V38c0-1.103-.897-2-2-2s-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2v-3.5c0-.276.224-.5.5-.5s.5.224.5.5V73C53 74.654 51.654 76 50 76zM62 76c-1.654 0-3-1.346-3-3V47.5c0-.276.224-.5.5-.5s.5.224.5.5V73c0 1.103.897 2 2 2s2-.897 2-2V38c0-1.103-.897-2-2-2s-2 .897-2 2v1.5c0 .276-.224.5-.5.5S59 39.776 59 39.5V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C65 74.654 63.654 76 62 76z"></path><path fill="#1f212b" d="M59.5 45c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2C60 44.776 59.776 45 59.5 45zM38 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C41 74.654 39.654 76 38 76zM38 36c-1.103 0-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2V38C40 36.897 39.103 36 38 36z"></path>
        </svg>
      </span>
    </li>
  )
}


function Footer({ item }) {
  if (item.length === 0) {
    return (
      <footer className="static w-full stats bg-yellow-900 flex justify-center items-center py-6 lg:py-10 ">
        <span className="text-white text-lg sm:text-lg font-semibold  sm:max-w-full ">Daftar belanjaan masih kosong!</span>
      </footer >
    )
  }

  // buat masing masing total item, checked, dan percentage
  const totalItems = item.length
  const checkedItems = item.filter((item) => item.checked === true).length
  const percentage = Math.round((checkedItems / totalItems) * 100)


  console.log(` total item : ${totalItems}`)
  console.log(` Percentage item : ${percentage}`)
  if (checkedItems > 1) {
    console.log(` checked item : ${checkedItems}`)
  };

  return (
    <footer className="static w-full stats bg-yellow-900 flex justify-center items-center py-6 lg:py-10 ">
      <span className="text-white text-lg sm:text-lg font-semibold  sm:max-w-full ">Ada {totalItems} Barang di daftar belanjaan <span className="hp:block sm:inline">{checkedItems} barang sudah dibeli ({percentage}%)</span></span>
    </footer>
  )
}