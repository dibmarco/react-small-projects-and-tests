import { useState } from "react";

function App() {
  return (
    <div>
      <TextContainer>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, atque,
        temporibus corporis ipsum exercitationem omnis expedita nihil nesciunt,
        magni accusantium veritatis molestias debitis perspiciatis itaque aut.
        Consequuntur recusandae totam adipisci. Repellat, atque magnam? Dolor
        maiores, aut, cumque modi aliquid numquam delectus nostrum, similique
        mollitia qui optio inventore a. Saepe eligendi corrupti aperiam eum
        reprehenderit libero necessitatibus error dignissimos nobis molestiae.
        Quaerat minima debitis odio corporis soluta repellendus laborum veniam
        sed sint iure non harum esse vitae dignissimos excepturi aut eius,
        aliquam veritatis nemo ut sunt corrupti! Dignissimos corporis nobis
        sunt?
      </TextContainer>
      <TextContainer>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt
        reprehenderit assumenda vel nam itaque ipsum ut expedita sunt veniam
        quis quas corrupti dolores porro necessitatibus pariatur, illum,
        voluptate quisquam beatae? Vel nihil, nam, est ratione tenetur dicta
        eligendi tempore perspiciatis ducimus aspernatur aliquid libero enim,
        accusantium sint voluptates dolorem exercitationem? Placeat tenetur hic
        omnis ipsam consectetur iste velit? Ipsam, nostrum?
      </TextContainer>
    </div>
  );
}

function TextContainer({ children }) {
  const [showText, setShowText] = useState(false);

  function toggleShowText() {
    setShowText(!showText);
  }

  const textPreview = children.split(" ").slice(0, 15).join(" ") + "...";
  // console.log(textPreview);

  return (
    <div className="text">
      <p>
        {showText ? children : textPreview}{" "}
        <button onClick={() => toggleShowText()}>
          {showText ? "Show Less" : "Show More"}
        </button>
      </p>
    </div>
  );
}

export default App;
