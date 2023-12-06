import Blog from "../components/Blog";

const blogs: { title: string; content: string; date: Date }[] = [
  {
    title: "Teszt1",
    content:
      "A blogon keresztül megismerhetitek a szakdolgozatom kulcsfontosságú elemeit, az általam alkalmazott módszereket, és a téma aktualitását. A posztokban különböző témákra fogok fókuszálni, beleértve a legfrissebb kutatási eredményeket, személyes gondolataimat, és esetlegesen interjúkat is megosztok majd szakértőkkel, akik szintén ezen a területen dolgoznak. ",
    date: new Date(),
  },
  {
    title: "Tesz2",
    content:
      "A blogon keresztül megismerhetitek a szakdolgozatom kulcsfontosságú elemeit, az általam alkalmazott módszereket, és a téma aktualitását. A posztokban különböző témákra fogok fókuszálni, beleértve a legfrissebb kutatási eredményeket, személyes gondolataimat, és esetlegesen interjúkat is megosztok majd szakértőkkel, akik szintén ezen a területen dolgoznak.",
    date: new Date(),
  },
  {
    title: "Teszt3",
    content:
      "A blogon keresztül megismerhetitek a szakdolgozatom kulcsfontosságú elemeit, az általam alkalmazott módszereket, és a téma aktualitását. A posztokban különböző témákra fogok fókuszálni, beleértve a legfrissebb kutatási eredményeket, személyes gondolataimat, és esetlegesen interjúkat is megosztok majd szakértőkkel, akik szintén ezen a területen dolgoznak.",
    date: new Date(),
  },
  {
    title: "Teszt4",
    content:
      "A blogon keresztül megismerhetitek a szakdolgozatom kulcsfontosságú elemeit, az általam alkalmazott módszereket, és a téma aktualitását. A posztokban különböző témákra fogok fókuszálni, beleértve a legfrissebb kutatási eredményeket, személyes gondolataimat, és esetlegesen interjúkat is megosztok majd szakértőkkel, akik szintén ezen a területen dolgoznak.",
    date: new Date(),
  },
];

export default function NewsScreen() {
  return (
    <div className="news-wrapper">
      {blogs.map((blog) => {
        return <Blog blog={blog} />;
      })}
    </div>
  );
}
