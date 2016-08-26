

export class InMemoryDataService {

    createDb() {

        let cars = [
            {
                "id": 1,
                "name": "Bugatti Chiron",
                "rating": 5,
                "image": "./data/images/cars/bugatti-chiron.jpg"
            },
            {
                "id": 2,
                "name": "Bugatti Veyron 16.4 Super Sport ",
                "rating": 5,
                "image": "./data/images/cars/bugatti-veyron-ss.jpg"
            },
            {
                "id": 3,
                "name": "CCR - Koenigsegg",
                "rating": 4,
                "image": "./data/images/cars/ccr.jpg"
            },
            {
                "id": 4,
                "name": "Hennessey Venom GT",
                "rating": 4,
                "image": "./data/images/cars/hennessey-venom.jpg"
            },
            {
                "id": 5,
                "name": "Laferrari",
                "rating": 4,
                "image": "./data/images/cars/laferrari.jpg"
            },
            {
                "id": 6,
                "name": "mclaren F1",
                "rating": 3,
                "image": "./data/images/cars/mclaren-f1.jpg"
            },
            {
                "id": 7,
                "name": "mclaren P1",
                "rating": 3,
                "image": "./data/images/cars/mclaren-p1.jpg"
            },
            {
                "id": 8,
                "name": "Aston Martin One-77",
                "rating": 3,
                "image": "./data/images/cars/one-77.jpg"
            },
            {
                "id": 9,
                "name": "Shelby SSC Aero TT",
                "rating": 4,
                "image": "./data/images/cars/sscaero.jpg"
            },
            {
                "id": 10,
                "name": "Jaguar XJ220",
                "rating": 3,
                "image": "./data/images/cars/xj220.jpg"
            },
            {
                "id": 11,
                "name": "Lamborghini",
                "rating": 3,
                "image": "./data/images/cars/lamborghini.jpg"
            },
            {
                "id": 12,
                "name": "Bentley",
                "rating": 3,
                "image": "./data/images/cars/bentley.jpg"
            },
            {
                "id": 13,
                "name": "Maserati",
                "rating": 3,
                "image": "./data/images/cars/Maserati.jpg"
            }

        ];

        let companies = [

            {
                "id": 1,
                "name": "Bugatti",
                "overview": "Was a French car manufacturer of high-performance automobiles, founded in 1909 in the then German city of Molsheim, Alsace by Italian-born Ettore Bugatti. Bugatti cars were known for their design beauty (Ettore Bugatti was from a family of artists and considered himself to be both an artist and constructor) and for their many race victories. Famous Bugattis include the Type 35 Grand Prix cars, the Type 41 'Royale', the Type 57 'Atlantic' and the Type 55 sports car. The death of Ettore Bugatti in 1947 proved to be the end for the marque, and the death of his son Jean Bugatti in 1939 ensured there was not a successor to lead the factory. No more than about 8,000 cars were made. The company struggled financially, and released one last model in the 1950s, before eventually being purchased for its airplane parts business in the 1960s. In the 1990s, an Italian entrepreneur revived it as a builder of limited production exclusive sports cars. Today, the name is owned by German automobile manufacturing group Volkswagen.",
                "logo": "./data/images/companies/bugatti.jpg"
            },
            {
                "id": 2,
                "name": "Koenigsegg",
                "overview": "Is a Swedish manufacturer of high-performance sports cars, based in Ängelholm, Skåne County, Sweden. The company was founded in 1994 in Sweden by Christian von Koenigsegg, with the intention of producing a 'world-class' supercar. Many years of development and prototyping led to the company's first street-legal production car delivery in 2002. In 2006 Koenigsegg began production of the CCX, which uses an engine created in-house especially for that vehicle. The CCX is street-legal in most countries, including the US. In March 2009 the Koenigsegg CCXR was chosen by Forbes to be one of the most beautiful cars in history. In December 2010 the Koenigsegg Agera won the BBC Top Gear Hypercar of the Year Award. Apart from developing, manufacturing and selling the Koenigsegg line of supercars, Koenigsegg is also involved in 'green technology' development programmes beginning with the CCXR ('Flower Power') flexfuel supercar and continuing through the present with the Agera R. Koenigsegg is also active in development programs of plug-in electric cars' systems and next-generation reciprocating engine technologies. Koenigsegg develops and produces most of the main systems, subsystems and components needed for their cars in-house instead of relying on subcontractors. At the end of 2015 Koenigsegg had 97 employees in total with an engineering department of 25 engineers led by Christian von Koenigsegg himself.",
                "logo": "./data/images/companies/koenigsegg.jpg"
            },
            {
                "id": 3,
                "name": "Hennessey Performance Engineering",
                "overview": " Is an American tuning house specializing in modifying sports and super cars from several brands like Ferrari, Porsche, McLaren, Chevrolet, Dodge, Cadillac, Lotus, Jeep, Ford, GMC, Lincoln and Lexus. Established in 1991 by John Hennessey, their main facility is located west of Houston, Texas. This firm focuses on mechanical component modification for creating high-powered cars. Besides performance automobiles, they also tune sport utility vehicles such as Ford Raptors and Jeep Cherokees. They also work on luxury cars like Bentleys and muscle cars like Dodge Charger and Challenger.",
                "logo": "./data/images/companies/hennessy.jpg"
            },
            {
                "id": 4,
                "name": "Ferrari",
                "overview": " is an Italian sports car manufacturer based in Maranello. Founded by Enzo Ferrari in 1939 as Auto Avio Costruzioni, the company built its first car in 1940. However, the company's inception as an auto manufacturer is usually recognized in 1947 when the first Ferrari-badged car was completed.Ferrari is the world's most powerful brand according to Brand Finance. In May 2012 the 1962 Ferrari 250 GTO became the most expensive car in history, selling in a private transaction for US$38.1 million to American communications magnate Craig McCaw.",
                "logo": "./data/images/companies/ferrari"
            },
            {
                "id": 5,
                "name": "McLaren-Honda",
                "overview": "Is a British Formula One team based at the McLaren Technology Centre, Woking, Surrey, England. McLaren is best known as a Formula One constructor but has also competed in and won the Indianapolis 500 and the Canadian-American Challenge Cup (Can-Am). The team is the second oldest active team after Ferrari. They are one of the most successful teams in Formula One history, having won 182 races, 12 drivers' championships and eight constructors' championships. The team is a wholly owned subsidiary of McLaren Technology Group.",
                "logo": "./data/images/companies/mclaren.jpg"
            },
            {
                "id": 6,
                "name": "Aston Martin Lagonda Limited",
                "overview": "Is a British manufacturer of luxury sports cars and grand tourers. It was founded in 1913 by Lionel Martin and Robert Bamford. The firm became associated with luxury grand touring cars in the 1950s and 1960s, and with the fictional character James Bond following his use of a DB5 model in the 1964 film Goldfinger.The company has had a chequered financial history, including bankruptcy in the 1970s, but has also enjoyed long periods of success and stability, including under the ownership of David Brown, from 1947 to 1972 and of the Ford Motor Company from 1994 to 2007",
                "logo": "./data/images/companies/aston.jpg"
            },
            {
                "id": 7,
                "name": "SSC North America",
                "overview": "Is an American automobile manufacturer founded in 1998[1] by owner Jerod Shelby (no relation to car designer Carroll Shelby). The company is based in West Richland, near the Tri-Cities, Washington and specialized in the production of sports cars based on a Pontiac Fiero-derived space frame. They built the SSC Aero, a kit car based on a Pontiac Fiero spaceframe chassis, equipped with a twin turbocharged pushrod engined V8s. Its turbocharged 6.35 litres (388 cu in) V8 produces 1,287 bhp (960 kW; 1,305 PS), which made it the most powerful production car in the world, until the arrival of Koenigsegg One:1 (1,341 bhp (1,000 kW; 1,360 PS)) in 2014. On September 13, 2007, the 'Ultimate Aero' took the title of fastest production car. The Ultimate Aero has a top speed of 412 km/h (256 mph). On June 26, 2010 the title was again lost to the upgraded Bugatti Veyron Super Sport that now holds the world speed record for production cars - 267.856 miles per hour (431.072 km/h). In late 2010, there was a design presented as the SSC Tuatara. It is to feature a custom-built V8 engine. The engine was installed in an Ultimate Aero for testing, and is reputed to have also been installed in a Pontiac G8.",
                "logo": "./data/images/companies/shelby2.jpg"
            },
            {
                "id": 8,
                "name": "Jaguar Cars",
                "overview": "Is the luxury vehicle brand of Jaguar Land Rover, a British multinational car manufacturer with its headquarters in Whitley, Coventry, England, owned by the Indian company Tata Motors since 2008. Jaguar's business was founded as the Swallow Sidecar Company in 1922, originally making motorcycle sidecars before developing bodies for passenger cars. Under the ownership of S. S. Cars Limited the business extended to complete cars made in association with Standard Motor Co many bearing Jaguar as a model name. The company's name was changed from S. S. Cars to Jaguar Cars in 1945. A merger with the British Motor Corporation followed in 1966, the resulting enlarged company now being renamed as British Motor Holdings (BMH), which in 1968 merged with Leyland Motor Corporation and became British Leyland, itself to be nationalised in 1975. Jaguar was de-merged from British Leyland and was listed on the London Stock Exchange in 1984, becoming a constituent of the FTSE 100 Index until it was acquired by Ford in 1990. Jaguar has, in recent years, manufactured cars for the British Prime Minister, the most recent delivery being an XJ in May 2010. The company also holds royal warrants from Queen Elizabeth II and Prince Charles. Jaguar cars today are designed in Jaguar Land Rover's engineering centres at the Whitley plant in Coventry and at their Gaydon site in Warwickshire, and are assembled in their plants at Castle Bromwich and Solihull. In September 2013 Jaguar Land Rover announced plans to open a 100 million GBP (160 million USD) research and development centre in the University of Warwick, Coventry to create a new generation of vehicle technologies.",
                "logo": "./data/images/companies/jaguar.jpg"
            },
            {
                "id": 9,
                "name": "Automobili Lamborghini S.p.A.",
                "overview": "Is an Italian brand and manufacturer of luxury sports cars and SUVs based in Sant'Agata Bolognese, Italy. The company is owned by the Volkswagen Group through its subsidiary Audi. In 2015, Lamborghini's 1,175 employees produced 3,248 vehicles. Ferruccio Lamborghini, an Italian manufacturing magnate, founded Automobili Ferruccio Lamborghini S.p.A. in 1963 to compete with established marques, including Ferrari. The company gained wide acclaim in 1966 for the Miura sports coupé, which established rear mid-engine, rear wheel drive as the standard layout for high-performance cars of the era. Lamborghini grew rapidly during its first decade, but sales plunged in the wake of the 1973 worldwide financial downturn and the oil crisis. The firm's ownership changed three times after 1973, including a bankruptcy in 1978. American Chrysler Corporation took control of Lamborghini in 1987 and sold it to Malaysian investment group Mycom Setdco and Indonesian group V'Power Corporation in 1994. In 1998, Mycom Setdco and V'Power sold Lamborghini to the Volkswagen Group where it was placed under the control of the group's Audi division. New products and model lines were introduced to the brand's portfolio and brought to the market and saw an increased productivity for the brand Lamborghini. In the late 2000s, during the worldwide financial crisis and the subsequent economic crisis, Lamborghini's sales saw a drop of nearly 50 percent.",
                "logo": "./data/images/companies/lamborghini.jpg"
            },
            {
                "id": 10,
                "name": "Bentley Motors Limited",
                "overview": " is a British registered company that designs, develops, and manufactures Bentley luxury motorcars which are largely hand-built. It is a subsidiary of Volkswagen AG.[12] Now based in Crewe, England, Bentley Motors Limited was founded by W. O. Bentley on 18 January 1919 in Cricklewood, North London. Bentley cars are sold via franchised dealers worldwide, and as of November 2012, China was the largest market.Most Bentley cars are assembled at the Crewe factory, but a small number of Continental Flying Spurs are assembled at the factory in Dresden, Germany.[14] Bodies for the Continental are produced in Zwickau, Germany. Bentley won the 24 Hours of Le Mans in 1924, 1927, 1928, 1929, 1930, and 2003. Iconic Bentley models include the Bentley 4½ Litre, Bentley Speed Six, Bentley R Type Continental, Bentley Turbo R, and Bentley Arnage. As of 2015, Bentley produce the Continental Flying Spur, Continental GT, Bentley Bentayga and the Mulsanne. Rolls-Royce bought Bentley from the receivers in 1931 and subsequently sold it to Vickers plc in 1980 when Rolls-Royce themselves went bankrupt. In 1998, Vickers sold it to Volkswagen AG. The sale included the vehicle designs, model nameplates, production and administrative facilities, the Spirit of Ecstasy and Rolls-Royce grille shape trademarks, but not the rights to the Rolls-Royce name or logo which are owned by Rolls-Royce Holdings plc and were licensed to BMW AG.",
                "logo": "./data/images/companies/bentley.jpg"
            },
            {
                "id": 11,
                "name": "Maserati S.p.A.",
                "overview": "The company's headquarters are now in Modena, and its emblem is a trident. It has been owned by the Italian–American car giant Fiat Chrysler Automobiles (FCA) and FCA's Italian predecessor Fiat S.p.A. since 1993. Maserati was initially associated with Ferrari S.p.A., which               was also owned by FCA until being spun off in 2015, but more recently it has become part of the sports car group including Alfa Romeo and Abarth (see section below). In May 2014, due to ambitious plans and product launches, Maserati sold a record of over 3,000 cars. This                 caused them to increase production of the Quattroporte and Ghibli models. In addition to the Ghibli and Quattroporte, Maserati offers the Maserati GranTurismo, the GranTurismo Convertible, and has confirmed that it will be offering the Maserati Levante, the first Maserati               SUV, in 2016, and the Maserati Alfieri, a new 2+2 in 2016. Maserati is placing a production output cap at 75,000 vehicles globally",
                "logo": "./data/images/companies/Maserati.jpg"
            }

        ]

        return { companies, cars}
    }
}