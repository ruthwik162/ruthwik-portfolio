import React from 'react'
import Architecture from '../Components/Architecture'
import ParallaxImage from '../Components/ParellaxImage'

const expert = [
  {
    name: "Web Design",
    desc: "Crafting stunning layouts that catch the eye."
  },
  {
    name: "Web Development",
    desc: "Turning ideas into fast, functional websites."
  },
  {
    name: "UX Design",
    desc: "Designing smooth, intuitive user journeys."
  },
  {
    name: "Brand Identity",
    desc: "Building visuals that make brands unforgettable."
  },
  {
    name: "Art Direction",
    desc: "Shaping the mood, style, and creative vision."
  }
];

const skill = [
  {
    name: "Design",
    desc: "Figma, Google Gemini, Chatgpt"
  },
  {
    name: "Front technologies",
    desc: "HTML, TailwindCss, JavaScript, React, Gsap, Framer"
  },
  {
    name: "Backend",
    desc: "Node, Express, Java , MongooDb, MySql"
  },
  {
    name: "Project Management",
    desc: "Agile Methodology"
  },

];


const Capability = () => {
  return (
    <div className='w-full min-h-screen'>


      <section className='w-full  min-h-screen'>
        <div className='flex items-start  mt-[15vh] md:mt-[0] justify-center '>
          {/* rightside */}
          <div className='w-full h-full mx-[2vw] md:mx-[5vw] lg:mt-[15vw] xl:mt-[7vw] md:mt-[20vw] overflow-hidden'>
            <div className='overflow-hidden'>
              <h1 className='text-[7vw] tracking-tight md:text-[5vw] lg:text-[5vw] text-black font-poppins font-poppins-500 md:leading-[5vw] text-start'>Skills <span className='text-gray-400'>&</span> Expertice</h1>
              <p className='text-[3vw] md:text-[2vw] md:leading-[2vw] md:max-w-xl lg:text-[2vw] lg:leading-[2vw] xl:text-[1vw] xl:leading-[1.2vw] font-poppins font-poppins-300  '>Design, development, and strategy—crafted to bring ideas to life and make every interaction meaningful.</p>
            </div>

            <div className='overflow-hidden mt-[5vw] '>
              <div className='text-[4vw] md:text-[5vw] lg:text-[5vw] xl:text-[3vw] font-[aeonik1]'>
                <h1>Expertise</h1>
              </div>
              <div className='overflow-hidden  p-2'>
                {expert.map((exp, i) => (
                  <div key={i} className='flex items-center font-[aeonik1] border-b space-y-3 border-gray-200 md:text-[1.2vw] justify-between '>

                    <span className='flex items-center justify-start text-[4vw] lg:text-[2.5vw] xl:text-[1.6vw] md:text-[2.5vw]'><span className='text-[3vw] md:text-[2vw]  '> [{i + 1}] &nbsp; </span> {exp.name}</span>
                    <span className='text-[2.8vw] xl:text-[1vw] lg:text-[2vw] md:text-[2vw]'>{exp.desc}</span>
                  </div>
                ))}

              </div>
            </div>

            <div className='overflow-hidden mt-[5vw] '>
              <div className='text-[8vw] md:text-[4vw] font-[aeonik2]'>
                <h1>Skill & Knowledge</h1>
              </div>
              <div className='overflow-hidden  p-2'>
                {skill.map((exp, i) => (
                  <div key={i} className='flex items-center font-[aeonik1] border-b space-y-3 border-gray-200 md:text-[1.2vw] justify-between '>

                    <span className='flex items-center text-[4vw] font-[aeonik1] md:font-[aeonik2] justify-start md:text-[2.5vw]'><span className='text-[3vw] md:text-[2vw]'> [{i + 1}] &nbsp; </span> {exp.name}</span>
                    <span className='md:text-[2vw] lg:text-[2vw] xl:text-[1.1vw]  text-[2.5vw]' >{exp.desc}</span>
                  </div>
                ))}

              </div>
            </div>



          </div>
          {/* left side */}
          <div className='w-2/3 xl:block hidden h-full bg-black'>
            <div className='overflow-hidden w-full h-full'>
              <div className='w-full h-full object-center object-cover'>
                <ParallaxImage src="https://images.unsplash.com/photo-1702538091338-cc70d39db3c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTcyfHxjYWJhbGl0eSUyMG9mJTIwd29yayUyMHdpdGglMjBtb2JpbGV8ZW58MHx8MHx8fDA%3D" alt="" />
              </div>
            </div>
          </div>
        </div>

      </section>

      <div className='overflow-hidden xl:mt-[15vh] md:mt-[5vw]'>
        <div className='text-center md:text-[3vw] font-[font2] text-gray-400'>
          <h1>Designing for <span className='text-black'>clarity</span>, <span className='text-black'>impact</span>, and delight—one project at a time.</h1>
        </div>
      </div>

      <section className='w-full  min-h-screen'>
        <div className='flex items-start  mt-[15vh] md:mt-[5vw] justify-center '>

          {/* left side */}
          <div className='w-2/3 xl:block hidden h-full bg-black'>
            <div className='overflow-hidden w-full h-full'>
              <div className='w-full h-full object-center object-cover'>
                <ParallaxImage src="https://images.unsplash.com/photo-1637904743105-3118bbe3ed8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGxhcHRvcCUyMHdpdGglMjBwcm9qZWN0JTIwcmVhY3QlMjBkZXZlbG9waW5nfGVufDB8MXwwfHx8MA%3D%3D" alt="" />
              </div>
            </div>
          </div>
          {/* rightside */}
          <div className='w-full h-full mx-[2vw] md:mx-[5vw]  overflow-hidden'>
            <div className='overflow-hidden mt-[5vw]  '>
              <Architecture />
            </div>
          </div>
        </div>
      </section>


      <section className='w-full flex items-center justify-start min-h-screen'>
        <div className='overflow-hidden px-10'>
          <div className='md:text-[5vw] md:leading-[5vw] font-[font2] '>
            <h1>The <span className='text-gray-400 font-[font3]'>End</span>...</h1>
          </div>
          <div className='md:text-[5vw] md:leading-[5vw] font-[font2] '>
            <h1>Not our Journey</h1>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Capability
