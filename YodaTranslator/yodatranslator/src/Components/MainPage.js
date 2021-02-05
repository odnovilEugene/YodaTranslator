import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import GridAlign from "./GridAlign";
import sithBackground from "../Images/sith.png";
import yodaBackground from "../Images/yoda.jpg";
import gunganBackground from "../Images/gungan.jpg";
import hutteseBackground from "../Images/huttese.jpg";
import cheunhBackground from "../Images/cheunh.jpg";
import mandalorianBackground from "../Images/mandalorian.jpg";
import sithAvatar from "../Avatars/sith.jpg";
import yodaAvatar from "../Avatars/yoda.jpg";
import gunganAvatar from "../Avatars/gungan.jpg"
import hutteseAvatar from "../Avatars/huttese.jpg"
import cheunhAvatar from "../Avatars/cheunh.jpg"
import mandalorianAvatar from "../Avatars/mandalorian.jpg"
import Dialog from "@material-ui/core/Dialog";
import {makeStyles} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import ListItemText from "@material-ui/core/ListItemText";

const translators = ["yoda", "sith", "mandalorian", "huttese", "gungan", "cheunh"];

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

const styles = {
    name: {
        sith: {
            name: "sith",
            backgroundImage: `url(${sithBackground})`,
            fontFamily: "sith",
            color: "White",
            backgroundColor: "#b80f2b",
            avatarSrc: sithAvatar
        },
        cheunh: {
            name: "cheunh",
            backgroundImage: `url(${cheunhBackground})`,
            fontFamily: "cheunh",
            color: "White",
            backgroundColor: "#b80f2b",
            avatarSrc: cheunhAvatar
        },
        gungan: {
            name: "gungan",
            backgroundImage: `url(${gunganBackground})`,
            fontFamily: "gungan",
            color: "White",
            backgroundColor: "#0b7abf",
            avatarSrc: gunganAvatar
        },
        huttese: {
            name: "huttese",
            backgroundImage: `url(${hutteseBackground})`,
            fontFamily: "huttese",
            color: "White",
            backgroundColor: "#b80f2b",
            avatarSrc: hutteseAvatar
        },
        mandalorian: {
            name: "mandalorian",
            backgroundImage: `url(${mandalorianBackground})`,
            fontFamily: "mandalorian",
            color: "Black",
            backgroundColor: "#0b7abf",
            avatarSrc: mandalorianAvatar

        },
        yoda: {
            name: "yoda",
            backgroundImage: `url(${yodaBackground})`,
            fontFamily: "yoda",
            color: "Black",
            backgroundColor: "#0b7abf",
            avatarSrc: yodaAvatar
        }
    }
}

function findStyle(translator) {
    for (let i in styles.name) {
        if (styles.name[i].name === translator) {
            return styles.name[i]
        }
    }
    return null
}


function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {

    onClose(value);
  };

  const correctStyle = findStyle(selectedValue)

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <List style={{backgroundColor: correctStyle.backgroundColor}}>
        {translators.map((translator) => (
          <ListItem button onClick={() => handleListItemClick(translator)} key={translator}>
            <ListItemAvatar>
              <Avatar className={classes.avatar} alt="" src={findStyle(translator).avatarSrc}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={translator} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default function MainPage() {

    const [translator, setTranslator] = useState(localStorage.getItem('translator'))
    const [text, setText] = useState("")
    const [translatorText, setTranslatorText] = useState("Translated line will be here")
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setTranslatorText("Translated line will be here")
        setOpen(false);
        setTranslator(value);
        localStorage.setItem('translator', value)
    };

    const onTranslateClick = () => {
        setTranslatorText("Loading...")
        axios.post("/translate/" + translator + ".json", { text }).then(resp =>{
            const { translated } = resp.data.contents
            setTranslatorText(translated)
        }).catch((err) => {
            setTranslatorText("Failed to parse text")
            console.log(err)
        })
    }

    const correctStyle = findStyle(translator)

    return (
        <div class="mainDiv" style={correctStyle}>
            <GridAlign>
                <div class="unionContainer">
                    <button onClick={handleClickOpen} class="button" style={{fontFamily: correctStyle.fontFamily}}>Choose translator</button>
                    <SimpleDialog class="dialog" selectedValue={translator} open={open} onClose={handleClose} />
                    <h1 class="translation">{translatorText}</h1>
                    <input class="input" placeholder="Input line" onChange={(e => setText(e.target.value))}/>
                    <button class="button" style={{fontFamily: correctStyle.fontFamily}} onClick={onTranslateClick}>Translate</button>
                </div>
            </GridAlign>
        </div>
    )
}