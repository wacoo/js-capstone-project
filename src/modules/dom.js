import APILoader from "./api_loader.js";

import pikachu from "../images/pikachu.jpg";
import  Spearow from "../images/Spearow.png";
import Fearow from "../images/Fearow.png";
import Ekans from "../images/Ekans.png";
import  Arbok from "../images/Arbok.png";
import Pikachu from "../images/Pikachu.png";
import Raichu from "../images/Raichu.png";
import Sandshrew from "../images/Sandshrew.png";
import Sandslash from "../images/Sandslash.png";
import NidoranF from "../images/NidoranF.png";
import Nidorina from "../images/Nidorina.png";
import Nidoqueen from "../images/Nidoqueen.png";
import NidoranM from "../images/NidoranM.png";
import Nidorino from "../images/Nidorino.png";
import Nidoking from "../images/Nidoking.png";
import Clefairy from "../images/Clefairy.png";
import Clefable from "../images/Clefable.png";
import Vulpix from "../images/Vulpix.png";
import Ninetales from "../images/Ninetales.png";
import Jigglypuff from "../images/Jigglypuff.png";
import Wigglytuff from "../images/Wigglytuff.png";
const parent = document.getElementById("parent");

const loader = new APILoader();

class DOMManipulator {
  displayItems = async () => {
    loader.url = "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20";
    const data = await loader.getData();
    data.results.forEach((pokimon) => {
      const card = this.createCard(pokimon);
    });
  };

  createCard = async (pokimon) => {
    const createData = {
      card: ['div', ['card'], null],
      cardWrapper: ['div', ['card-wrapper'], null],
      pokImage: ['img', ['pok-image'], 'pok-image'],
      nameLikeParent: ['div', ['name-like-parent'], null],
      span: ['span', ['name'], null],
      likeParent: ['div', ['like-parent'], null],
      like: ['a', null, 'like'],
      i: ['i', ['fa', 'fa-heart'], null],
      noOfLikes: ['span', ['no-of-likes'], null],
      comment: ['button', ['comment'], null],
    };
    const elem = this.batchCreateElements(createData);

    elem.pokImage.src = pikachu;
    const name = pokimon.name.charAt(0).toUpperCase() + pokimon.name.slice(1);
    elem.span.innerHTML = name;    
    elem.noOfLikes.innerHTML = "0 likes";
    this.likeItem(elem.like, name);

    const likes = await this.loadLikes();
    likes.forEach(like => {
      if (like.item_id === name) {
        elem.noOfLikes.innerHTML = `${like.likes} likes`;
      }
    });
    
    this.setImageSource(elem, name, likes);
    
    elem.comment.innerHTML = "Comments";
    elem.like.href="";
    const appendData = [
      { child: elem.cardWrapper, parent: elem.card },
      { child: elem.pokImage, parent: elem.cardWrapper },
      { child: elem.nameLikeParent, parent: elem.cardWrapper },
      { child: elem.span, parent: elem.nameLikeParent },
      { child: elem.likeParent, parent: elem.nameLikeParent },
      { child: elem.like, parent: elem.likeParent },
      { child: elem.i, parent: elem.like },
      { child: elem.noOfLikes, parent: elem.likeParent },
      { child: elem.comment, parent: elem.cardWrapper },
    ];

    this.batchAppendElements(appendData);
  }

  likeItem (likebutton, id) {
    likebutton.addEventListener('click', async (event) => {
      event.preventDefault();
      loader.url= 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OPvtcYAiYtOGk6E05HZz/likes';
      const itemId = {
        'item_id': id
      }
      const likes = await loader.setData(itemId);
      if(likes === 201) {
        const lk = likebutton.parentNode.childNodes[1].innerHTML.split(' ')[0];
        likebutton.parentNode.childNodes[1].innerHTML = `${Number(lk) + 1} likes`;
      }
    });
  }

  loadLikes = async () => {
    loader.url= 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OPvtcYAiYtOGk6E05HZz/likes';
    const likes = await loader.getData();
    return likes;
  }

  addComment = (commentData) => {
    loader.url= 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OPvtcYAiYtOGk6E05HZz/comments';
    const comment = loader.setData(commentData);
    console.log(comment);
  }

  createElement = (type, clss, id) => {
    const element = document.createElement(type);
    if (clss) {
      clss.forEach((cls) => {
        element.classList.add(cls);
      });
    }

    if (id) {
      element.id = id;
    }
    return element;
  };

  appendElement = (child, parent) => {
    if (parent) {
      parent.appendChild(child);
    }
  };

  batchCreateElements = (createData) => {
    const elt = {};
    const keyValuePair = Object.entries(createData);
    keyValuePair.forEach(([key, val]) => {
      elt[key] = this.createElement(...val);
    });
    return elt;
  };

  batchAppendElements = (appendData) => {
    appendData.forEach((elt) => {
      this.appendElement(elt.child, elt.parent);
    });
    parent.appendChild(appendData[0].parent);
  }

  setImageSource = (elem, name) => {
    switch (name) {
        case "Spearow":
          elem.pokImage.src = Spearow;
          break;
        case "Fearow":
          elem.pokImage.src = Fearow;
          break;
        case "Ekans":
          elem.pokImage.src = Ekans;
          break;
        case "Arbok":
          elem.pokImage.src = Arbok;
          break;
        case "Pikachu":
          elem.pokImage.src = Pikachu;
          break;
        case "Raichu":
          elem.pokImage.src = Raichu;
          break;
        case "Sandshrew":
          elem.pokImage.src = Sandshrew;
          break;
        case "Sandslash":
          elem.pokImage.src = Sandslash;
          break;
        case "Nidoran-f":
          elem.pokImage.src = NidoranF;
          break;
        case "Nidorina":
          elem.pokImage.src = Nidorina;
          break;
        case "Nidoqueen":
          elem.pokImage.src = Nidoqueen;
          break;
        case "Nidoran-m":
          elem.pokImage.src = NidoranM;
          break;
        case "Nidorino":
          elem.pokImage.src = Nidorino;
          break;
        case "Nidoking":
          elem.pokImage.src = Nidoking;
          break;
        case "Clefairy":
          elem.pokImage.src = Clefairy;
          break;
        case "Clefable":
          elem.pokImage.src = Clefable;
          break;
        case "Vulpix":
          elem.pokImage.src = Vulpix;
          break;
        case "Ninetales":
          elem.pokImage.src = Ninetales;
          break;
        case "Jigglypuff":
          elem.pokImage.src = Jigglypuff;
          break;
        case "Wigglytuff":
          elem.pokImage.src = Wigglytuff;
          break;
        default:
          // Handle the case when the Pokémon name is not found.
          break;
      }
  }
}

export default DOMManipulator;
