import { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function CreateBusinessUnitForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessUnitCode: "",
    businessUnitDesc: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    region: "",
    country: "",
    pinCode: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

       const indianCities = [
        "Mumbai",
        "Delhi",
        "Bengaluru",
        "Hyderabad",
        "Ahmedabad",
        "Chennai",
        "Kolkata",
        "Surat",
        "Pune",
        "Jaipur",
        "Lucknow",
        "Kanpur",
        "Nagpur",
        "Indore",
        "Thane",
        "Bhopal",
        "Visakhapatnam",
        "Pimpri-Chinchwad",
        "Patna",
        "Vadodara",
      ];
    
    
      const otherCities = [
        "Kabul", "Kandahar", "Herat", "Mazar-i-Sharif", "Tirana", "Durres", "Vlore", "Shkoder", "Algiers", "Oran", "Constantine", "Annaba", "Andorra la Vella", "Escaldes-Engordany", "Encamp", "Luanda", "Huambo", "Lobito", "Benguela", "St. John's", "All Saints", "Liberta", "Potter’s Village", "Buenos Aires", "Córdoba", "Rosario", "Mendoza", "Yerevan", "Gyumri", "Vanadzor", "Vagharshapat", "Canberra", 
        "Sydney", "Melbourne", "Brisbane", "Vienna", "Graz", "Linz", "Salzburg", "Baku", "Ganja", "Sumqayit", "Lankaran", "Nassau", "Freeport", "West End", "Coopers Town", "Manama", "Riffa", "Muharraq", "Hamad Town", "Dhaka", "Chittagong", "Khulna", "Rajshahi", "Bridgetown", "Speightstown", "Oistins", "Holetown", "Minsk", "Gomel", "Mogilev", "Vitebsk", "Brussels", "Antwerp", "Ghent", "Charleroi", 
        "Belmopan", "Belize City", "San Ignacio", "Orange Walk", "Porto-Novo", "Cotonou", "Parakou", "Djougou", "Thimphu", "Phuntsholing", "Paro", "Punakha", "Sucre", "La Paz", "Santa Cruz", "Cochabamba", "Sarajevo", "Banja Luka", "Mostar", "Tuzla", "Gaborone", "Francistown", "Molepolole", "Maun", "Brasília", "São Paulo", "Rio de Janeiro", "Salvador", "Bandar Seri Begawan", "Kuala Belait", "Seria", 
        "Tutong", "Sofia", "Plovdiv", "Varna", "Burgas", "Ouagadougou", "Bobo-Dioulasso", "Koudougou", "Ouahigouya", "Gitega", "Bujumbura", "Muyinga", "Ngozi", "Phnom Penh", "Siem Reap", "Battambang", "Sihanoukville", "Yaoundé", "Douala", "Bamenda", "Bafoussam", "Ottawa", "Toronto", "Montreal", "Vancouver", "Praia", "Mindelo", "Santa Maria", "Assomada", "Bangui", "Bimbo", "Berbérati", "Carnot", 
        "N'Djamena", "Moundou", "Sarh", "Abéché", "Santiago", "Valparaíso", "Concepción", "Antofagasta", "Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Bogotá", "Medellín", "Cali", "Barranquilla", "Moroni", "Mutsamudu", "Fomboni", "Domoni", "Brazzaville", "Pointe-Noire", "Dolisie", "Nkayi", "Kinshasa", "Lubumbashi", "Mbuji-Mayi", "Kananga", "San José", "Limón", "Alajuela", "Heredia", "Zagreb", 
        "Split", "Rijeka", "Osijek", "Havana", "Santiago de Cuba", "Camagüey", "Holguín", "Nicosia", "Limassol", "Larnaca", "Famagusta", "Prague", "Brno", "Ostrava", "Plzeň", "Copenhagen", "Aarhus", "Odense", "Aalborg", "Djibouti", "Ali Sabieh", "Tadjoura", "Obock", "Roseau", "Portsmouth", "Marigot", "Berekua", "Santo Domingo", "Santiago", "La Romana", "San Pedro de Macorís", "Quito", "Guayaquil", 
        "Cuenca", "Santo Domingo", "Cairo", "Alexandria", "Giza", "Shubra El-Kheima", "San Salvador", "Santa Ana", "Soyapango", "San Miguel", "Malabo", "Bata", "Ebebiyín", "Aconibe", "Asmara", "Keren", "Massawa", "Assab", "Tallinn", "Tartu", "Narva", "Pärnu", "Mbabane", "Manzini", "Lobamba", "Siteki", "Addis Ababa", "Dire Dawa", "Mek'ele", "Nazret", "Suva", "Lautoka", "Nadi", "Labasa", "Helsinki", 
        "Espoo", "Tampere", "Vantaa", "Paris", "Marseille", "Lyon", "Toulouse", "Libreville", "Port-Gentil", "Franceville", "Oyem", "Banjul", "Serekunda", "Brikama", "Bakau", "Tbilisi", "Kutaisi", "Batumi", "Rustavi", "Berlin", "Hamburg", "Munich", "Cologne", "Accra", "Kumasi", "Tamale", "Takoradi", "Athens", "Thessaloniki", "Patras", "Heraklion", "St. George’s", "Gouyave", "Grenville", "Victoria", 
        "Guatemala City", "Mixco", "Villa Nueva", "Quetzaltenango", "Conakry", "Kankan", "Labé", "Nzérékoré", "Bissau", "Bafatá", "Gabú", "Bissorã", "Georgetown", "Linden", "New Amsterdam", "Bartica", "Port-au-Prince", "Cap-Haïtien", "Gonaïves", "Les Cayes", "Tegucigalpa", "San Pedro Sula", "La Ceiba", "Choloma", "Budapest", "Debrecen", "Szeged", "Miskolc", "Reykjavik", "Kópavogur", "Hafnarfjörður", 
        "Akureyri", "Jakarta", "Surabaya", "Bandung", "Medan", "Tehran", "Mashhad", "Isfahan", "Karaj", "Baghdad", "Basra", "Mosul", "Erbil", "Dublin", "Cork", "Limerick", "Galway", "Jerusalem", "Tel Aviv", "Haifa", "Beersheba", "Rome", "Milan", "Naples", "Turin", "Yamoussoukro", "Abidjan", "Bouaké", "Daloa", "Kingston", "Spanish Town", "Montego Bay", "May Pen", "Tokyo", "Yokohama", "Osaka", "Nagoya", 
        "Amman", "Zarqa", "Irbid", "Russeifa", "Astana", "Almaty", "Shymkent", "Karaganda", "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Tarawa", "Betio", "Bairiki", "Bonriki", "Pyongyang", "Hamhung", "Chongjin", "Nampo", "Seoul", "Busan", "Incheon", "Daegu", "Pristina", "Prizren", "Peja", "Gjakova", "Kuwait City", "Al Ahmadi", "Hawalli", "Salmiya", "Bishkek", "Osh", "Jalal-Abad", "Karakol", "Vientiane", 
        "Pakse", "Savannakhet", "Luang Prabang", "Riga", "Daugavpils", "Liepaja", "Jelgava", "Beirut", "Tripoli", "Sidon", "Tyre", "Maseru", "Teyateyaneng", "Mafeteng", "Hlotse", "Monrovia", "Gbarnga", "Kakata", "Buchanan", "Tripoli", "Benghazi", "Misrata", "Sabha", "Vaduz", "Schaan", "Balzers", "Triesen", "Vilnius", "Kaunas", "Klaipeda", "Šiauliai", "Luxembourg City", "Esch-sur-Alzette", "Differdange", 
        "Dudelange", "Antananarivo", "Toamasina", "Antsirabe", "Mahajanga", "Lilongwe", "Blantyre", "Mzuzu", "Zomba", "Kuala Lumpur", "George Town", "Johor Bahru", "Ipoh", "Malé", "Addu City", "Fuvahmulah", "Kulhudhuffushi", "Bamako", "Sikasso", "Mopti", "Ségou", "Valletta", "Birkirkara", "Qormi", "Mosta", "Majuro", "Ebeye", "Arno", "Jaluit", "Nouakchott", "Nouadhibou", "Rosso", "Kaédi", "Port Louis", 
        "Beau Bassin-Rose Hill", "Vacoas-Phoenix", "Curepipe", "Mexico City", "Guadalajara", "Monterrey", "Puebla", "Palikir", "Weno", "Kolonia", "Tofol", "Chișinău", "Tiraspol", "Bălți", "Bender", "Monaco", "Monte Carlo", "La Condamine", "Fontvieille", "Ulaanbaatar", "Erdenet", "Darkhan", "Choibalsan", "Podgorica", "Nikšić", "Pljevlja", "Bijelo Polje", "Rabat", "Casablanca", "Marrakech", "Fes", "Maputo", 
        "Beira", "Nampula", "Quelimane", "Naypyidaw", "Yangon", "Mandalay", "Mawlamyine", "Windhoek", "Walvis Bay", "Swakopmund", "Rundu", "Yaren (de facto)", "Denigomodu", "Aiwo", "Buada", "Kathmandu", "Pokhara", "Lalitpur", "Biratnagar", "Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Wellington", "Auckland", "Christchurch", "Hamilton", "Managua", "León", "Masaya", "Chinandega", "Niamey", "Zinder", 
        "Maradi", "Tahoua", "Abuja", "Lagos", "Kano", "Ibadan", "Skopje", "Bitola", "Kumanovo", "Prilep", "Oslo", "Bergen", "Trondheim", "Stavanger", "Muscat", "Salalah", "Sohar", "Nizwa", "Islamabad", "Karachi", "Lahore", "Faisalabad", "Ngerulmud", "Koror", "Melekeok", "Airai", "Panama City", "Colón", "David", "La Chorrera", "Port Moresby", "Lae", "Mount Hagen", "Madang", "Asunción", "Ciudad del Este", 
        "San Lorenzo", "Luque", "Lima", "Arequipa", "Trujillo", "Chiclayo", "Manila", "Quezon City", "Cebu City", "Davao City", "Warsaw", "Kraków", "Łódź", "Wrocław", "Lisbon", "Porto", "Amadora", "Braga", "Doha", "Al Rayyan", "Al Wakrah", "Al Khor", "Bucharest", "Cluj-Napoca", "Timișoara", "Iași", "Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kigali", "Butare", "Gitarama", "Ruhengeri",
         "Basseterre", "Charlestown", "Castries", "Vieux Fort", "Gros Islet", "Soufrière", "Kingstown", "Georgetown", "Barrouallie", "Chateaubelair", "Apia", "Salelologa", "Faleasiu", "Fasito'o Uta", "San Marino", "Serravalle", "Borgo Maggiore", "Domagnano", "São Tomé", "Santo Amaro", "Neves", "Trindade", "Riyadh", "Jeddah", "Mecca", "Medina", "Dakar", "Touba", "Thiès", "Kaolack", "Belgrade", "Novi Sad", 
         "Niš", "Kragujevac", "Victoria", "Anse Boileau", "Bel Ombre", "Takamaka", "Freetown", "Bo", "Kenema", "Makeni", "Singapore", "Bratislava", "Košice", "Prešov", "Žilina", "Ljubljana", "Maribor", "Celje", "Kranj", "Honiara", "Auki", "Gizo", "Buala", "Mogadishu", "Hargeisa", "Bosaso", "Kismayo", "Pretoria", "Johannesburg", "Cape Town", "Durban", "Juba", "Malakal", "Wau", "Aweil", "Madrid", "Barcelona", 
         "Valencia", "Seville", "Sri Jayawardenepura Kotte", "Colombo", "Kandy", "Galle", "Khartoum", "Omdurman", "Nyala", "Port Sudan", "Paramaribo", "Lelydorp", "Nieuw Nickerie", "Moengo", "Stockholm", "Gothenburg", "Malmö", "Uppsala", "Bern", "Zurich", "Geneva", "Basel", "Damascus", "Aleppo", "Homs", "Hama", "Taipei", "Kaohsiung", "Taichung", "Tainan", "Dushanbe", "Khujand", "Bokhtar", "Kulob", "Dodoma", 
         "Dar es Salaam", "Mwanza", "Arusha", "Bangkok", "Chiang Mai", "Pattaya", "Nakhon Ratchasima", "Dili", "Baucau", "Maliana", "Suai", "Lomé", "Sokodé", "Kara", "Kpalimé", "Nukuʻalofa", "Neiafu", "Haveluloto", "Vaini", "Port of Spain", "San Fernando", "Chaguanas", "Arima", "Tunis", "Sfax", "Sousse", "Kairouan", "Ankara", "Istanbul", "Izmir", "Bursa", "Ashgabat", "Turkmenabat", "Daşoguz", "Mary", "Funafuti", 
         "Vaiaku", "Asau", "Motufoua", "Kampala", "Gulu", "Lira", "Mbarara", "Kyiv", "Kharkiv", "Odessa", "Dnipro", "Abu Dhabi", "Dubai", "Sharjah", "Al Ain", "London", "Birmingham", "Manchester", "Glasgow", "Washington, D.C.", "New York City", "Los Angeles", "Chicago", "Montevideo", "Salto", "Paysandú", "Las Piedras", "Tashkent", "Samarkand", "Bukhara", "Namangan", "Port Vila", "Luganville", "Norsup", "Isangel", 
         "Vatican City", "Caracas", "Maracaibo", "Valencia", "Barquisimeto", "Hanoi", "Ho Chi Minh City", "Da Nang", "Hai Phong", "Sana'a", "Aden", "Taiz", "Al Hudaydah", "Lusaka", "Ndola", "Kitwe", "Livingstone", "Harare", "Bulawayo", "Chitungwiza", "Mutare"
    
      ];
  const validateField = (name, value) => {
    switch (name) {
      case 'businessUnitCode':
        if (!/^[a-zA-Z0-9]{4}$/.test(value)) {
          return 'Business Unit Code must be exactly 4 alphanumeric characters';
        }
        break;
      case 'businessUnitDesc':
        if (value.length > 30 || !/^[a-zA-Z0-9 ]+$/.test(value)) {
          return 'Business Unit Description must be alphanumeric and up to 30 characters';
        }
        break;
      case 'street1':
        if (!value.trim()) return 'Street 1 is required';
        if (value.length > 50) {
          return 'Street address must be up to 50 characters';
        }
        break;
      case 'street2':
        if (value.length > 50) {
          return 'Street address must be up to 50 characters';
        }
        break;
      case 'city':
        if (!value.trim()) return 'City is required';
        if (value.length > 30 || !/^[a-zA-Z ]+$/.test(value)) {
          return 'Must contain only letters and up to 30 characters';
        }
        break;
      case 'state':
        if (!value.trim()) return 'State is required';
        if (value.length > 30 || !/^[a-zA-Z ]+$/.test(value)) {
          return 'Must contain only letters and up to 30 characters';
        }
        break;
      case 'country':
        if (!value.trim()) return 'Country is required';
        if (value.length > 30 || !/^[a-zA-Z ]+$/.test(value)) {
          return 'Must contain only letters and up to 30 characters';
        }
        break;
      case 'region':
        if (!value.trim()) return 'Region is required';
        if (value.length > 50) {
          return 'Region must be up to 50 characters';
        }
        break;
      case 'pinCode':
        if (!value.trim()) return 'Pin Code is required';
        if (!/^\d{4,6}$/.test(value)) {
          return 'Pin code must be 4-6 digits';
        }
        break;
      default:
        return '';
    }
    return '';
  };

  const handleCancel = () => {
    navigate('/displayBusinessUnit');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For Business Unit Code, convert to uppercase and remove spaces
    if (name === "businessUnitCode") {
      const processedValue = value.toUpperCase().replace(/\s/g, '');
      setFormData(prev => ({ ...prev, [name]: processedValue }));
      
      const error = validateField(name, processedValue);
      setErrors(prev => ({ ...prev, [name]: error }));
      return;
    }

    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));

    if (name === "country") {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        city: ""
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields before submission
    let formValid = true;
    const newErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        formValid = false;
      }
    });
    
    setErrors(newErrors);
    
    if (!formValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3003/api/business-units', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create business unit');
      }

      const createdData = await response.json();

      alert("Business Unit created successfully!");
      navigate('/displayBusinessUnit');
    } catch (error) {
      console.error('Error creating business unit:', error);
      alert(error.message || "An error occurred while creating the business unit");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* Business Unit Details */}
        <div className="header-box">
          <h2>Business Unit Details</h2>
          <div className="data-container">
            <div className="data">
              <label htmlFor="businessUnitCode">Business Unit Code*</label>
              <span className="info-icon-tooltip">
                <i className="fas fa-info-circle" />
                <span className="tooltip-text">
                  1- Must be exactly 4 alphanumeric characters<br />
                  2- Must be unique<br />
                  3- No special characters or spaces<br />
                  4- Cannot be changed after creation
                </span>
              </span>
              <input
                type="text"
                id="businessUnitCode"
                name="businessUnitCode"
                value={formData.businessUnitCode}
                onChange={handleChange}
                maxLength={4}
                required
                className={errors.businessUnitCode ? "error" : ""}
              />
              {errors.businessUnitCode && (
                <div className="error-message">{errors.businessUnitCode}</div>
              )}
            </div>
            <div className="data">
              <label htmlFor="businessUnitDesc">Business Unit Description*</label>
              <input
                type="text"
                id="businessUnitDesc"
                name="businessUnitDesc"
                value={formData.businessUnitDesc}
                onChange={handleChange}
                maxLength={30}
                required
                className={errors.businessUnitDesc ? "error" : ""}
              />
              {errors.businessUnitDesc && (
                <div className="error-message">{errors.businessUnitDesc}</div>
              )}
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="item-box">
          <h2>Address Details</h2>
          <div className="data-container">
            <div className="data">
              <label htmlFor="street1">Street 1*</label>
              <input
                type="text"
                id="street1"
                name="street1"
                value={formData.street1}
                onChange={handleChange}
                maxLength={50}
                required
                className={errors.street1 ? "error" : ""}
              />
              {errors.street1 && (
                <div className="error-message">{errors.street1}</div>
              )}
            </div>

            <div className="data">
              <label htmlFor="street2">Street 2</label>
              <input
                type="text"
                id="street2"
                name="street2"
                value={formData.street2}
                onChange={handleChange}
                maxLength={50}
                className={errors.street2 ? "error" : ""}
              />
              {errors.street2 && (
                <div className="error-message">{errors.street2}</div>
              )}
            </div>

            <div className="data">
              <label htmlFor="state">State*</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                maxLength={30}
                required
                className={errors.state ? "error" : ""}
              />
              {errors.state && (
                <div className="error-message">{errors.state}</div>
              )}
            </div>

                <div className="data">
                <label htmlFor="region">Region*</label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a region</option>
                  {[
                    "Northern Africa",
                    "Western Africa",
                    "Eastern Africa",
                    "Central Africa (Middle Africa)",
                    "Southern Africa",
                    "Northern America",
                    "Central America",
                    "Caribbean",
                    "South America",
                    "Central Asia",
                    "Eastern Asia",
                    "South-Eastern Asia",
                    "Southern Asia",
                    "Western Asia (Middle East)",
                    "Eastern Europe",
                    "Northern Europe",
                    "Southern Europe",
                    "Western Europe",
                    "Australia and New Zealand",
                    "Melanesia",
                    "Micronesia",
                    "Polynesia",
                  ].map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div className="data">
                <label htmlFor="country">Country*</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a country</option>
                  {[
                    "Afghanistan",
                    "Albania",
                    "Algeria",
                    "Andorra",
                    "Angola",
                    "Antigua and Barbuda",
                    "Argentina",
                    "Armenia",
                    "Australia",
                    "Austria",
                    "Azerbaijan",
                    "Bahamas",
                    "Bahrain",
                    "Bangladesh",
                    "Barbados",
                    "Belarus",
                    "Belgium",
                    "Belize",
                    "Benin",
                    "Bhutan",
                    "Bolivia",
                    "Bosnia and Herzegovina",
                    "Botswana",
                    "Brazil",
                    "Brunei",
                    "Bulgaria",
                    "Burkina Faso",
                    "Burundi",
                    "Cambodia",
                    "Cameroon",
                    "Canada",
                    "Cape Verde",
                    "Central African Republic",
                    "Chad",
                    "Chile",
                    "China",
                    "Colombia",
                    "Comoros",
                    "Congo (Brazzaville)",
                    "Congo (Kinshasa)",
                    "Costa Rica",
                    "Croatia",
                    "Cuba",
                    "Cyprus",
                    "Czech Republic",
                    "Denmark",
                    "Djibouti",
                    "Dominica",
                    "Dominican Republic",
                    "Ecuador",
                    "Egypt",
                    "El Salvador",
                    "Equatorial Guinea",
                    "Eritrea",
                    "Estonia",
                    "Eswatini",
                    "Ethiopia",
                    "Fiji",
                    "Finland",
                    "France",
                    "Gabon",
                    "Gambia",
                    "Georgia",
                    "Germany",
                    "Ghana",
                    "Greece",
                    "Grenada",
                    "Guatemala",
                    "Guinea",
                    "Guinea-Bissau",
                    "Guyana",
                    "Haiti",
                    "Honduras",
                    "Hungary",
                    "Iceland",
                    "India",
                    "Indonesia",
                    "Iran",
                    "Iraq",
                    "Ireland",
                    "Israel",
                    "Italy",
                    "Ivory Coast",
                    "Jamaica",
                    "Japan",
                    "Jordan",
                    "Kazakhstan",
                    "Kenya",
                    "Kiribati",
                    "Korea, North",
                    "Korea, South",
                    "Kosovo",
                    "Kuwait",
                    "Kyrgyzstan",
                    "Laos",
                    "Latvia",
                    "Lebanon",
                    "Lesotho",
                    "Liberia",
                    "Libya",
                    "Liechtenstein",
                    "Lithuania",
                    "Luxembourg",
                    "Madagascar",
                    "Malawi",
                    "Malaysia",
                    "Maldives",
                    "Mali",
                    "Malta",
                    "Marshall Islands",
                    "Mauritania",
                    "Mauritius",
                    "Mexico",
                    "Micronesia",
                    "Moldova",
                    "Monaco",
                    "Mongolia",
                    "Montenegro",
                    "Morocco",
                    "Mozambique",
                    "Myanmar",
                    "Namibia",
                    "Nauru",
                    "Nepal",
                    "Netherlands",
                    "New Zealand",
                    "Nicaragua",
                    "Niger",
                    "Nigeria",
                    "North Macedonia",
                    "Norway",
                    "Oman",
                    "Pakistan",
                    "Palau",
                    "Panama",
                    "Papua New Guinea",
                    "Paraguay",
                    "Peru",
                    "Philippines",
                    "Poland",
                    "Portugal",
                    "Qatar",
                    "Romania",
                    "Russia",
                    "Rwanda",
                    "Saint Kitts and Nevis",
                    "Saint Lucia",
                    "Saint Vincent & Grenadines",
                    "Samoa",
                    "San Marino",
                    "São Tomé and Príncipe",
                    "Saudi Arabia",
                    "Senegal",
                    "Serbia",
                    "Seychelles",
                    "Sierra Leone",
                    "Singapore",
                    "Slovakia",
                    "Slovenia",
                    "Solomon Islands",
                    "Somalia",
                    "South Africa",
                    "South Sudan",
                    "Spain",
                    "Sri Lanka",
                    "Sudan",
                    "Suriname",
                    "Sweden",
                    "Switzerland",
                    "Syria",
                    "Taiwan",
                    "Tajikistan",
                    "Tanzania",
                    "Thailand",
                    "Timor-Leste",
                    "Togo",
                    "Tonga",
                    "Trinidad and Tobago",
                    "Tunisia",
                    "Turkey",
                    "Turkmenistan",
                    "Tuvalu",
                    "Uganda",
                    "Ukraine",
                    "United Arab Emirates",
                    "United Kingdom",
                    "United States",
                    "Uruguay",
                    "Uzbekistan",
                    "Vanuatu",
                    "Vatican City",
                    "Venezuela",
                    "Vietnam",
                    "Yemen",
                    "Zambia",
                    "Zimbabwe",
                  ].map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <span className="error">{errors.country}</span>
                )}
              </div>
            <div className="data">
              <label htmlFor="city">City*</label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className={errors.city ? "error" : ""}
              >
                <option value="">Select a city</option>
                {formData.country === "India"
                  ? indianCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))
                  : otherCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
              </select>
              {errors.city && (
                <div className="error-message">{errors.city}</div>
              )}
            </div>

            <div className="data">
              <label htmlFor="pinCode">Pin Code*</label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                maxLength={6}
                required
                className={errors.pinCode ? "error" : ""}
              />
              {errors.pinCode && (
                <div className="error-message">{errors.pinCode}</div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="submit-button">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
      <button className="cancel-button-header" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
}