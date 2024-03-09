"use client";
import styles from "./HoneyBlogPage.module.scss";
import ToPreviousPage from "@/frontend/components/consumers/ToPreviousPage/ToPreviousPage";
import Image from "next/image";

const HoneyBlogPage = () => {
  return (
    <>
      <ToPreviousPage />
      <div className={styles.article}>
        <p className={styles.title}>Наш блог</p>
        <div className={styles.articleContainer}>
          <div className={styles.imageWrapper}>
            <Image
              className={styles.image}
              src="/assets/blog-page/delicious-honey.jpg"
              alt="honey"
              priority
              fill
            />
          </div>

          <h2>Дивовижні властивості меду</h2>

          <p>
            <b>
              Очищення від токсинів і збільшення тривалості життя - переваги
              бджолиного меду виходять далеко за межі харчування працьовитих
              комах у вулику.
            </b>
          </p>

          <p>
            Не дивно, що бджоли знають про мед багато. Вони не лише виробники
            меду, а і його споживачі, причому справжні гурмани. Запропонуйте
            хворій бджолі різні сорти меду, і вона обере саме той, який найкраще
            бореться з інфекцією. Людям, навпаки, належить ще багато дізнатися
            про поживні властивості меду. Лише кілька десятиліть тому мед не
            відносили до надзвичайно корисних продуктів за межами базового
            харчування, каже ентомолог Мей Беренбаум з Університету Іллінойсу в
            Урбана-Шампейн. "Навіть пасічники та дослідники бджіл вважали його
            нічим іншим як цукровою водою".
          </p>

          <p>
            Мед смачний на тості або у чаї, однак - це не просто підсолоджувач.
            В&apos;язка рідина в його основі містить ферменти, вітаміни,
            мінерали та органічні молекули, які надають кожному меду
            унікальність і надають безліч переваг для здоров&apos;я. Мед
            виробляють різні комахи: джмелі, бджоли без жала, навіть медові оси.
            Але лише медоносні бджоли (виду Apis) виробляють стільки меду, що
            він потрапляє на полиці продуктових магазинів. Ця здатність виникла
            не відразу, вона - результат мільйону років еволюції.
          </p>

          <p>
            Бджоли як вид відокремилися від ос близько 120 мільйонів років тому,
            під час сплеску еволюції та поширення квіткових рослин. Різноманіття
            квітів разом зі зміною поведінки бджіл, які почали годувати своїх
            личинок пилком, а не комахами, стимулювало еволюцію приблизно 20
            тисяч видів бджіл, відомих сьогодні. Щоб стати досвідченим
            виробником меду, бджолам знадобилося ще кілька змін у поведінці та
            хімічних реакціях. Вони почали додавати трохи нектару до пилку, від
            чого його стало легше транспортувати. У них також з&apos;явилися
            воскові залози, які могли тепер окремо зберігати рідкий нектар і
            твердий пилок. "Віск - дуже гнучкий будівельний матеріал", - каже
            Крістіна Грозінгер, ентомолог з Університету штату Пенсильванія, яка
            вивчає соціальну поведінку й здоров&apos;я бджіл. Утворюючи
            стільники, медоносні бджоли формують з воску шестикутники. Це -
            найефективніша форма для зберігання будь-чого, тому що шестикутники
            щільно укладаються поруч. "Це геніальне інженерне рішення", - каже
            Грозінгер. Побудова численних невеликих однорідних клітин має ще
            одну перевагу. Більша площа поверхні означає, що вода швидше
            випаровується, і отже, містить менше мікробів. Процес виробляння
            меду, який заповнить чарунки стільника, починається, коли бджола
            ковтає нектар. Насправді вона його не їсть, принаймні солодка
            закуска не потрапляє до шлунку у традиційному розумінні. Вона
            зберігає нектар у своєму медовому шлунку, де він змішується з
            різними ферментами
          </p>

          <p>
            Одним із перших ферментів, які починають працювати, є інвертаза, яка
            розділяє молекули сахарози нектару навпіл, утворюючи прості цукри -
            глюкозу та фруктозу. Дивно, але бджоли не мають генів для вироблення
            цього ферменту. Вочевидь, його виробляє мікроб, який живе у
            кишківнику бджіл. Повернувшись до вулика, медоносна бджола відригує
            свій цінний вантаж бджолам першої лінії збору. Передача з рота у
            рот, яка відбувається далі, знижує вміст води і додає все більше
            ферментів, які продовжують розщеплювати нектар і зупиняють зростання
            мікробів. Далі бджоли поміщають суміш у клітинку вулика, й
            розмахуючи крилами, добиваються подальшого випаровування води. Тут
            відбувається ще декілька етапів ферментації, після чого клітину
            закривають воском. Бджоли-годувальниці годуватимуть обробленим медом
            інших членів вулика, а залишки зберігатимуть на холодні або дощові
            дні.
          </p>

          <h3>Солодкі ліки</h3>

          <p>
            У середині 1990-х років вчені зацікавилися нектаром. Мей Беренбаум
            знала, що нектар насичений хімічними речовинами рослин, які
            називають фітохімікатами. Ці сполуки відлякують шкідників і
            допомагають зростанню рослин та метаболізму у них. 1998 року
            дослідниця та її команда виявили, що різні види меду містять різний
            рівень антиоксидантів залежно від квіткового походження меду.
            Медоносні бджоли, яких годували цукровою водою, змішаною з двома
            фітохімічними речовинами меду - р-кумариновою кислотою та потужним
            антиоксидантом кверцетином - переносили пестициди краще, ніж ті, які
            отримували тільки цукрову воду.
          </p>

          <p>
            Крім того, бджоли, яких годували водою з фітохімічними речовинами,
            жили також. Інші дослідження виявили, що, наприклад, абсцизова
            кислота підвищує імунітет у бджіл, прискорює загоєння ран та
            підвищує стійкість до низьких температур. Інші фітохімічні речовини
            знижують негативний вплив паразитів, який є однією з головних причин
            занепаду медоносних бджіл. Доведено, що фітохімічні речовини
            пригнічують навіть бактерії, які спричинюють європейський та
            американський гнилець. Ця хвороба така заразна, що для запобігання
            її поширення рекомендують спалювати цілі вулики. Фітохімічні
            речовини також покращують різноманітність і кількість мікробів у
            кишківнику медоносних бджіл, що є відмінною профілактикою
            паразитарних інфекцій. Медоносні бджоли під час хвороби вибирають
            оздоровчий сорт меду. Ентомолог Сільвіо Ерлер і його команда
            запропонували медоносним бджолам, які страждали на паразитів, чотири
            види меду. Хворі бджоли надавали перевагу соняшниковому меду, який
            має антибіотичну активність, дослідники повідомили у журналі
            Behavioral Ecology and Sociobiology.
          </p>
        </div>
      </div>
    </>
  );
};

export default HoneyBlogPage;
