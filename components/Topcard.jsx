"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getTopRankedHospitals } from "@/lib/actions/Hospitals.action";
import { getTopRankedDoctors } from "@/lib/actions/Doctors.actions";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import Link from "next/link";

const Topcard = ({ type }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let data;
      if (type === "hospital") {
        data = await getTopRankedHospitals();
      } else if (type === "doctor") {
        data = await getTopRankedDoctors();
      }
      setData(data);
    }
    fetchData();
  }, [type]);

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollLeft -= 500;
    } else {
      current.scrollLeft += 500;
    }
    console.log(`scroll function called with direction: ${direction}`);
    console.log(`scrollRef.current:`, scrollRef.current);
  };

  return (
    <div>
      <h2>{type === "hospital" ? "Top Hospital" : "Top Doctor"}</h2>
      <div className="top_container">
        <div className="top" ref={scrollRef}>
          {data.map((item) => {
            return (
              <Link
                key={item._id}
                href={
                  type === "hospital"
                    ? `/hospitals/${item._id}`
                    : `/doctors/${item._id}`
                }
                className="topcard"
              >
                <div>
                  <Image
                src={item.p_img}
                alt={item.name}
                width={500}
                height={500}
              />
                </div>
                <div />
                <div>
                  <span>{item.name}</span>
                  {type === "hospital" ? (
                    <>
                      <span>{item.loc}</span>
                      <span>{item.fees}</span>
                      <span>{item.Exp}</span>
                    </>
                  ) : (
                    <>
                      <span>{item.spec}</span>
                      <span>{item.exp}</span>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="app__gallery-images_arrows">
        <BsArrowLeftShort
          className="gallery__arrow-icon"
          onClick={() => scroll("left")}
        />
        <BsArrowRightShort
          className="gallery__arrow-icon"
          onClick={() => scroll("right")}
        />
      </div>
    </div>
  );
};

export default Topcard;
