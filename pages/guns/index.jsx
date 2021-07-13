import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import useLocalStorage from "../../lib/localStorage";
import { FaArrowCircleUp } from "react-icons/fa";

import Link from "next/link";
import Layout from "../../components/layout/Layout";
import GunFilter from "../../components/filters/gunFilters/GunFilter";
import SearchFilter from "../../components/filters/gunFilters/SearchFilter";
import GunProductCard from "../../components/gun-page/GunProductCard";
import MobileGunFilter from "../../components/filters/gunFilters/MobileGunFilter";

export async function getStaticProps() {
  // Get guns
  const get = await fetch(process.env.GUNTRADER_API);
  const data = await get.json();
  const gunData = data.Guns;

  // Filter out guns with no images
  const guns = gunData.filter((gun) => gun.ImageCount > 1);

  // Get brands for the Gun filter.
  const findBrands = guns.map((gun) => gun.Make);
  const filterBrands = findBrands
    .filter((brand, index) => findBrands.indexOf(brand) === index)
    .sort();
  const brands = filterBrands.map((brand, index) => ({
    brands: {
      brandID: index,
      name: brand,
    },
  }));

  // Get categories for the category filter
  const findCategories = guns.map((gun) => gun.Type);
  const filterCategories = findCategories
    .filter((category, index) => findCategories.indexOf(category) === index)
    .sort();
  const categories = filterCategories.map((cat, index) => ({
    categories: {
      catID: index,
      name: cat,
    },
  }));

  // Get condition for the condition filter
  const findCondition = guns.map((gun) => gun.Condition);
  const filterCondition = findCondition
    .filter((condition, index) => findCondition.indexOf(condition) === index)
    .sort();
  const conditions = filterCondition.map((condition, index) => ({
    condition: {
      conID: index,
      name: condition,
    },
  }));

  // Get Mechanisms
  const findMechanism = guns.map((gun) => gun.Mechanism);
  const filterMechanism = findMechanism
    .filter((mechanism, index) => findMechanism.indexOf(mechanism) === index)
    .sort();
  const mechanisms = filterMechanism.map((mechanism, index) => ({
    mechanism: {
      mechID: index,
      name: mechanism,
    },
  }));

  return {
    props: {
      guns,
      brands,
      categories,
      conditions,
      mechanisms,
    },
    revalidate: 300,
  };
}

const Guns = ({ guns, categories, brands, conditions, mechanisms }) => {
  const initialRender = useRef(true);

  const [selectedCategory, setSelectedCategory] = useLocalStorage(
    "gunsCategory",
    {}
  );
  const [selectedBrand, setSelectedBrand] = useLocalStorage("gunsBrand", {});
  const [selectedCondition, setSelectedCondition] = useLocalStorage(
    "gunsCondition",
    {}
  );
  const [selectedMechanism, setSelectedMechanism] = useLocalStorage(
    "gunsMechanism",
    {}
  );
  const [gunFilters, setGunFilters] = useState();
  const [filteredGuns, setFilteredGuns] = useState();
  const [displayMobileFilter, setDisplayMobileFilter] = useState(false);
  const [showScroll, setShowScroll] = useState();

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 200) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 200) {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    return window.addEventListener("scroll", checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    localStorage.clear();
    setSelectedBrand({});
    setSelectedCategory({});
    setSelectedCondition({});
    setSelectedMechanism({});
    window.location.reload(false);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory({
      ...selectedCategory,
      [event.target.value]: event.target.checked,
    });
    if (displayMobileFilter) {
      setDisplayMobileFilter(false);
    }
  };

  const handleBrandChange = (event) => {
    setSelectedBrand({
      ...selectedBrand,
      [event.target.value]: event.target.checked,
    });
    if (displayMobileFilter) {
      setDisplayMobileFilter(false);
    }
  };

  const handleConditionChange = (event) => {
    setSelectedCondition({
      ...selectedCondition,
      [event.target.value]: event.target.checked,
    });
    if (displayMobileFilter) {
      setDisplayMobileFilter(false);
    }
  };

  const handleMechanismChange = (event) => {
    setSelectedMechanism({
      ...selectedMechanism,
      [event.target.value]: event.target.checked,
    });
    if (displayMobileFilter) {
      setDisplayMobileFilter(false);
    }
  };

  const handleFilters = () => {
    const appliedFilters = {
      Make: [],
      Type: [],
      Condition: [],
      Mechanism: [],
    };

    for (const MakeKey in selectedBrand) {
      if (selectedBrand[MakeKey]) appliedFilters.Make.push(MakeKey);
    }
    for (const TypeKey in selectedCategory) {
      if (selectedCategory[TypeKey]) appliedFilters.Type.push(TypeKey);
    }
    for (const ConditionKey in selectedCondition) {
      if (selectedCondition[ConditionKey])
        appliedFilters.Condition.push(ConditionKey);
    }
    for (const MechanismKey in selectedMechanism) {
      if (selectedMechanism[MechanismKey])
        appliedFilters.Mechanism.push(MechanismKey);
    }
    setGunFilters(appliedFilters);
  };

  const handleMobileFilter = () => {
    setDisplayMobileFilter(!displayMobileFilter);
    setSelectedBrand({});
    setSelectedCategory({});
    setSelectedCondition({});
  };

  const multiPropsFilter = (guns, gunFilters) => {
    const filterKeys = Object.keys(gunFilters);
    return guns.filter((gun) =>
      filterKeys.every((key) => {
        if (!gunFilters[key].length) return true;
        return gunFilters[key].includes(gun[key]);
      })
    );
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      handleFilters();
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      handleFilters();
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      handleFilters();
    }
  }, [selectedCondition]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      handleFilters();
    }
  }, [selectedMechanism]);

  useEffect(() => {
    if (gunFilters != undefined) {
      const myGuns = multiPropsFilter(guns, gunFilters);
      setFilteredGuns(myGuns);
    }
  }, [gunFilters]);

  if (!guns) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-vh">
          <Image src="/loading.gif" width={500} height={300} />
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>
          New & Used Firearms, Shotguns & Airguns | Shooting Supplies Ltd
        </title>
        <meta
          name="description"
          content="The best collection of New & Used Shotguns, Rifles and Airguns in the Midlands"
        />
        <link
          rel="canonical"
          href="https://www.shootingsuppliesltd.co.uk/guns"
        />
      </Head>
      <div className="hidden lg:flex lg:mx-60 lg:mt-8 cursor-pointer">
        <FaArrowCircleUp
          className="scrollTop lg:text-4xl xl:text-5xl text-ssblue"
          onClick={scrollTop}
          style={{
            height: 60,
            display: showScroll ? "flex" : "none",
            position: "fixed",
            bottom: "30px",
            right: "20px",
          }}
        />
      </div>
      <SearchFilter guns={guns} setFilteredGuns={setFilteredGuns} />
      <div
        role="navigation"
        className="xl:hidden flex justify-center items-center h-12 bg-ssblue text-white border-b border-ssblue"
        onClick={handleMobileFilter}
      >
        FILTERS
      </div>
      <>
        {displayMobileFilter && (
          <div>
            <MobileGunFilter
              categories={categories}
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
              brands={brands}
              selectedBrand={selectedBrand}
              handleBrandChange={handleBrandChange}
              conditions={conditions}
              selectedCondition={selectedCondition}
              handleConditionChange={handleConditionChange}
              mechanisms={mechanisms}
              selectedMechanism={selectedMechanism}
              handleMechanismChange={handleMechanismChange}
            />
          </div>
        )}
      </>
      <div className="flex justify-center lg:mx-4 xl:mx-20 lg:my-12">
        <div className="hidden xl:block px-4 max-w-sm">
          <GunFilter
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            brands={brands}
            selectedBrand={selectedBrand}
            handleBrandChange={handleBrandChange}
            conditions={conditions}
            selectedCondition={selectedCondition}
            handleConditionChange={handleConditionChange}
            mechanisms={mechanisms}
            selectedMechanism={selectedMechanism}
            handleMechanismChange={handleMechanismChange}
            clearFilters={clearFilters}
          />

          <Link href="/tippmann-arms">
            <div className="hidden lg:mt-8 lg:block">
              <Image
                src="/banners/Tippmann-Mobile.png"
                layout="responsive"
                width={220}
                height={260}
                className="rounded-lg cursor-pointer"
              />
            </div>
          </Link>
        </div>

        <main>
          <ul className="mt-4 lg:mt-0 grid gap-y-8 md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-3 xl:gap-x-6 xl:gap-y-12">
            {filteredGuns
              ? filteredGuns.map((gun) => (
                  <li key={gun.ID}>
                    <GunProductCard gun={gun} />
                  </li>
                ))
              : guns.map((gun) => (
                  <li key={gun.ID}>
                    <GunProductCard gun={gun} />
                  </li>
                ))}
          </ul>
        </main>
      </div>
    </>
  );
};

export default Guns;
