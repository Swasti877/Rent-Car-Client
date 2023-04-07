import "./LandingPage2.css";
import BenefitCard from './BenefitCard.js';

function landingPage2() {
  return (
    <div className="LandingPage2">
      <div className="title">
        <h1>UNMATCHED BENEFITS</h1>
        <p>Drive everywhere with freedom</p>
      </div>
      <div className="card-carousel">
        <BenefitCard />
        <BenefitCard />
        <BenefitCard />
        <BenefitCard />
        <BenefitCard />
        <BenefitCard />
        <BenefitCard />
        <BenefitCard />
      </div>
    </div>
  );
}

export default landingPage2;
