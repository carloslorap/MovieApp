import React, { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CgSelect } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { LanguageData, RatesData, TimesData, YearData } from "../Data/FilterData";
import { getAllMoviesAction } from "../redux/Actions/moviesActions";
import { useParams } from "react-router-dom";




const Filter = ({categories}) => {
  const dispatch = useDispatch()
  const [category, setCategory] = useState({ title: "All Categories"});
  const [year, setYear] = useState(YearData[0]);
  const [times, settimes] = useState(TimesData[0]);
  const [rates, setrates] = useState(RatesData[0]);
  const [language, setlanguage] = useState(LanguageData[0])
  const {search} =useParams()

  const Filter = [
    {
      value: category,
      onchange: setCategory,
      items: categories?.length > 0 ? [{title:"All Categories"}, ...categories]:[{title: "No category found"}],
    },
    {
      value: language, 
      onchange: setlanguage,
      items: LanguageData,
    },
    {
      value: year,
      onchange: setYear,
      items: YearData,
    },
    {
      value: times,
      onchange: settimes,
      items: TimesData,
    },
    {
      value: rates,
      onchange: setrates,
      items: RatesData,
    },
  ];


  useEffect(()=>{
    if (category?.title !== "No category found") {
      dispatch(getAllMoviesAction({
        category: category?.title === "All Categories" ? "" : category?.title,
        time: times?.title.replace(/\D/g, ""),
        language: language?.title === "Sort By Language" ? "" : language?.title,
        rate: rates?.title.replace(/\D/g, ""),
        year: year?.title.replace(/\D/g, ""),   
        search: search ? search : "" 
        
        
      }))
    }
  },[category,language,year,times,rates,dispatch,search])
  return (
    <div className="my-6 bg-dry border text-dryGray border-dry grid md:grid-cols-5 grid-cols-2 lg:gap-12 gap-2 rounded p-6">
      {Filter.map((item, index) => (
        <Listbox key={index} value={item.value} onChange={item.onchange}>
          <div className="relative">
            <Listbox.Button className="relative border border-dry bg-main w-full text-white rounded-lg  cursor-default py-4 pl-6 pr-10 text-left text-xs">
              <span className="block truncate">{item.value.title}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2">
                <CgSelect className="h-4 w-4 " aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-dry border border-main text-dryGray rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-white ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {item.items.map((iterm, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-subMain text-white" : "text-white"
                      }`
                    }
                    value={iterm}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {iterm.title}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaCheck className="h-3 w-3" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      ))}
    </div>
  );
};

export default Filter;
