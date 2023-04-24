const carFilter = {
  carFilter: (carTypeFilters, carMakeFilters, carsArray) => {
    if (carTypeFilters.length !== 0 && carMakeFilters.length !== 0) {
      return carsArray.filter(
        (car) =>
          carTypeFilters.includes(car.carType) &&
          carMakeFilters.includes(car.make)
      );
    } else if (carTypeFilters.length !== 0 && carMakeFilters.length === 0) {
      return carsArray.filter((car) => carTypeFilters.includes(car.carType));
    } else if (carTypeFilters.length === 0 && carMakeFilters.length !== 0) {
      return carsArray.filter((car) => carMakeFilters.includes(car.make));
    } else {
      return carsArray;
    }
  },
};

export default carFilter;