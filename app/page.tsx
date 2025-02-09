import IconAnimated from "./components/IconAnimated";
import ExperienceSection from "./components/ExperienceSection"
import IAmProgrammerSection from "./components/IAmProgrammerSection"
import TestDrag from "./components/TestDrag"

export default function Home() {
  return (
    <div>
      {/* <div>

      <IAmProgrammerSection/>
      </div> */}
      <TestDrag/>
      {/* <div className="w-auto h-screen">Hi, I am Programmer</div> */}
      <br/>
      <br/>
      <br/>
      <div>
        <div>Languages I have learned</div>
        <IconAnimated/>
      </div>
      <br/>
      <div>My Experience</div>
      <br/>
      <ExperienceSection/>

    </div>
  );
}
