import { Button, Card, Elevation } from "@blueprintjs/core";

export const TestimonialsWidget = () => {
  return (
    <>
      <div className={"container"}>
        <div className={"testimonial"}>
          <blockquote className="bp3-blockquote">
            Premium Aerotec is a key supplier for Airbus, producing 30 million
            parts per year, which is huge complexity. Skywise helps us manage
            all the production steps. It gives Airbus much better visibility
            into where the product is in the supply chain, and it lets us
            immediately see our weak points so we can react on the spot.
          </blockquote>
        </div>
        <div className={"testimonial"}>
          <Card interactive={true} elevation={Elevation.TWO}>
            <h5>
              <a href="#">Card heading</a>
            </h5>
            <p>Card content</p>
            <Button>Submit</Button>
          </Card>
        </div>
        <div className={"testimonial"}>Testimonial 3</div>
      </div>
      <style jsx>{`
        .container {
          font-family: Open Sans;
          flex-direction: row;
          display: flex;
          border-style: solid;
          border-width: 1px;
          border-color: gray;
          border-bottom: solid 1px rgba(151, 151, 151, 0.15);
          padding: 10px;
          justify-content: space-between;
        }
        .testimonial {
          flex-grow: 1;
          font-family: Open Sans;
          border-style: solid;
          border-width: 1px;
          border-color: gray;
          border-bottom: solid 1px rgba(151, 151, 151, 0.15);
          padding: 10px;
        }
      `}</style>
    </>
  );
};
