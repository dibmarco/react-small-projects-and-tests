import { useState } from "react";

function App() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="container">
      <TextBlock openModal={openModal} setOpenModal={setOpenModal} />
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}

function TextBlock({ openModal, setOpenModal }) {
  return (
    <div className={`text-block ${openModal ? "blur" : ""}`}>
      <p className="text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quae,
        facere soluta harum quasi recusandae corrupti ut quia nihil, officiis
        quos aspernatur perferendis ullam illo. Eum vel voluptatibus ipsa alias!
        Odio, sequi animi nihil iure hic quos voluptas dolor officia totam sed
        voluptatibus esse aliquam omnis illum fuga saepe quae excepturi eos
        neque? Ab architecto dolorum eum, odio earum quidem. Autem sapiente
        accusantium, repellat voluptatibus sit sequi dolorum! Eius, nesciunt!
        Iste nulla illo ducimus? Aperiam voluptate, suscipit labore magni
        voluptas ad temporibus, quam nostrum tenetur reiciendis maiores. Quia,
        tenetur. Velit? Et tenetur officiis, nemo unde provident tempora dolorem
        sequi quo soluta saepe veniam minus perspiciatis voluptatum quidem nobis
        aspernatur omnis nulla totam ab quis iusto, numquam enim. Enim, tempore
        cum? Quas rem perferendis eos alias iure saepe commodi sapiente
        explicabo iusto quia quos dolores autem, perspiciatis dolorem illum
        temporibus ipsum fugit possimus mollitia, voluptatum exercitationem
        officiis porro a? Possimus, distinctio. Mollitia eaque accusamus rem
        voluptatibus rerum consectetur error dolor, at corrupti iure delectus
        aperiam facilis! Consequatur, magnam at quae eaque consectetur, veniam
        quidem aperiam illo, aliquam recusandae ullam ipsam dolore.
        Reprehenderit suscipit molestias asperiores temporibus voluptate, sint
        harum ipsa sapiente nostrum aut commodi inventore, soluta voluptatem
        labore aperiam repudiandae dolorum, quidem fuga tempore? Labore hic
        illum veritatis voluptatum a iusto.
      </p>
      <button onClick={() => setOpenModal(!openModal)}>Open modal</button>
    </div>
  );
}

function Modal({ openModal, setOpenModal }) {
  return (
    <div className={`modal ${openModal ? "" : "hidden"}`}>
      <h2>Modal Window</h2>
      <button onClick={() => setOpenModal(!openModal)}>Close</button>
    </div>
  );
}

export default App;
