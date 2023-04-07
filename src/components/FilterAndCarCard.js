import "./FilterAndCarCard.css";
import { BsFillFilterCircleFill } from "react-icons/bs";
import CarCard from "./CarCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import carAPIFetchFun from "../Functions/carAPIFetch";
import carFilter from "../Functions/carFilter";

export default function FilterAndCarCard() {
  const dispatch = useDispatch();
  const carsArray = useSelector((state) => state.cars.carsArray);
  const groupByCarType = useSelector((state) => state.cars.groupByCarType);
  const groupByCarMakeType = useSelector(
    (state) => state.cars.groupByCarMakeType
  );

  const [carTypeFilters, setcarTypeFilters] = useState([]);
  const [carMakeFilters, setCarMakeFilters] = useState([]);
  const [filterArray, setFilterArray] = useState(carsArray);

  useEffect(() => {
    carAPIFetchFun.groupbyCarType(dispatch);
    carAPIFetchFun.groupbyCarMake(dispatch);
    carAPIFetchFun.fetchAvialiableCars(dispatch);
  }, []);

  useEffect(() => {
    setFilterArray(carFilter.carFilter(carTypeFilters,carMakeFilters, carsArray));
  }, [carsArray, carTypeFilters, carMakeFilters]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (checked) setcarTypeFilters([...carTypeFilters, name]);
    else setcarTypeFilters(carTypeFilters.filter((index) => index !== name));
  };

  const handleCarMakeChange = (e) => {
    const { name, checked } = e.target;
    if (checked) setCarMakeFilters([...carMakeFilters, name]);
    else setCarMakeFilters(carMakeFilters.filter((index) => index !== name));
  }

  return (
    <>
      <div className="filterAndCarCard">
        {/* <Filter /> */}
        <div className="filter">
          <div className="filter-title">
            <div>Filter By</div>
            <div>
              <BsFillFilterCircleFill />
            </div>
          </div>
          {/* Car Type Filter */}
          <div className="filter-carType">
            <div className="filter-carType-title">CarType</div>
            <div className="filter-carType-checkboxs">
              {groupByCarType.length !== 0 &&
                groupByCarType.map((carType) => {
                  return (
                    <>
                      <input
                        type="checkbox"
                        id={carType._id}
                        key={carType._id}
                        name={carType._id}
                        onChange={handleChange}
                      />
                      <label for={carType._id}>
                        {carType._id}({carType.count})
                      </label>
                      <br />
                    </>
                  );
                })}
            </div>
          </div>

          {/* Car Make Filter */}
          <div className="filter-carMake">
            <div className="filter-carMake-title">Car Maker</div>
            <div className="filter-carMake-checkboxs">
              {groupByCarMakeType.length !== 0 &&
                groupByCarMakeType.map((carType) => {
                  return (
                    <>
                      <input
                        type="checkbox"
                        value={carType._id}
                        id={carType._id}
                        name={carType._id}
                        onChange={handleCarMakeChange}
                        key={carType._id}
                      />
                      <label for={carType._id}>
                        {carType._id}({carType.count})
                      </label>
                      <br />
                    </>
                  );
                })}
            </div>
          </div>

          <div className="filter-capacity">
            <div className="filter-capacity-title">Capacity</div>
            <div className="filter-capacity-checkboxs">
              <input type="checkbox" value="2to5" name="2to5" id="2to5" />
              <label for="2to5">2- 5(100)</label>
              <br />
              <input type="checkbox" value="6>" name="6>" id="6>" />
              <label for="6>">6 or more(4)</label>
            </div>
          </div>
        </div>
        {/* <CarCards /> */}
        <div className="carCards">
          {carsArray.length !== 0 &&
            carsArray.map((car) => {
              return <CarCard props={{ car }} key={car._id} />;
            })}
        </div>
      </div>
    </>
  );
}
