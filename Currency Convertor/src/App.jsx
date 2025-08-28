import { useState } from 'react'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/usecurrencyinfo'

function App() {
  const [amount , setAmount]=useState(0);
  const [from,setFrom]=useState("usd");
  const [to, setTo]=useState("inr");
  const [convertedAmount,setConvertedAmount]=useState(0);

  const currencyInfo=useCurrencyInfo(from); //customize HOOKs

  const options=Object.keys(currencyInfo);

  const swap=()=>{ //swapping 'to'=>'from' and vice-versa & 'amount'=>'convertedAmount' and vice-versa
    setFrom(to)
    setTo(from)

    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert=()=>{
    setConvertedAmount(amount * currencyInfo[to])
  }

  const clear=()=>{
    setAmount(0)
    setConvertedAmount(0)
  }

   return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url(https://images.pexels.com/photos/6770845/pexels-photo-6770845.jpeg)`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <div className='text-4xl flex justify-center pb-1.5 font-bold bg-amber-200'>Currency Convertor</div>
                    <br />
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert()
                           
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={setFrom}
                                onAmountChange={setAmount}
                                selectCurrency={from}
                                
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="cursor-pointer absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                                
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyChange={setTo}
                                selectCurrency={to}
                                amountDisable
                                
                            />
                        </div>
                        <div className='flex p-2 gap-4 '>
                            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg cursor-pointer">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                            </button>
                            <button className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg cursor-pointer' 
                            onClick={clear}>Clear</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App
