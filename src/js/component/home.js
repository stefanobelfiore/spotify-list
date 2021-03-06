import React, { useState, useEffect, Fragment } from "react";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
//create your first component
export function Home() {
	let mainUrl = "https://assets.breatheco.de/apis/sound/";
	const [listOfSongs, setListOfSongs] = useState([]); //----------------Array cada fichero canción
	const [myIndex, setMyIndex] = useState(-1);
	const [urlSong, setUrlSong] = useState(
		"https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"
	); //--------------------string url cada canción
	const [playSong, setplaySong] = useState(false); //----------------------estado canciones play/pause
	const AUDIO = document.querySelector("#audio"); //----------------guardar url audio en una variable fuente w3school

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(function(response) {
				console.log(response);
				if (!response.ok) {
					console.log(response.statusText);
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(function(responseAsJson) {
				console.log("me voy al gimnasio");
				setListOfSongs(responseAsJson); //aqui---------------------------------------
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);

	const printSongs = listOfSongs.map((oneSong, index) => {
		return (
			<div
				className={
					mainUrl.concat(index.toString()) == urlSong //--------si la canciòn actual es la clickada y tiene la misma url cambia estilo css
						? "onPlaying"
						: "onPause"
				}
				key={oneSong.url} //----elemento para distinguir una de otra y cambiar el color
				onClick={() => {
					setUrlSong(mainUrl.concat(oneSong.url));

					setMyIndex(index);
					setplaySong(true);
					AUDIO.load();
					AUDIO.play();
				}}>
				{oneSong.name}
			</div>
		);
	});

	function nextSong(songIndex) {
		let newurl = "";

		if (listOfSongs[songIndex + 1]) {
			newurl = mainUrl.concat(listOfSongs[songIndex + 1].url);
			setUrlSong(newurl);
			setMyIndex(songIndex + 1);
			AUDIO.load();
			AUDIO.play();
		} else {
			newurl = mainUrl.concat(listOfSongs[0].url);
			setUrlSong(newurl);
			setMyIndex(0);
			AUDIO.load();
			AUDIO.play();
		}
	}

	function previusSong(songIndex) {
		let newurl = "";

		if (listOfSongs[songIndex - 1]) {
			newurl = mainUrl.concat(listOfSongs[songIndex - 1].url);
			setUrlSong(newurl);
			setMyIndex(songIndex - 1);
			AUDIO.load();
			AUDIO.play();
		} else {
			newurl = mainUrl.concat(listOfSongs[21].url);
			setUrlSong(newurl);
			setMyIndex(0);
			AUDIO.load();
			AUDIO.play();
		}
	}

	return (
		<Fragment>
			<div className="text-center mt-5">
				<h1>Yours songs, it`s friday and your body knows it</h1>

				{printSongs}

				<div className="centering">
					<button onClick={() => previusSong(myIndex)}>
						<i className="fa fa-backward" />
					</button>
					<button onClick={() => AUDIO.pause()}>
						<i className="fa fa-pause" />
					</button>
					<button
						className="push--skeuo"
						onClick={() => AUDIO.play()}>
						<i className="fa fa-play" />
					</button>
					<button onClick={() => nextSong(myIndex)}>
						<i className="fa fa-forward" />
					</button>
				</div>
				<audio id="audio">
					<source src={urlSong} type="audio/mpeg" />
					Your browser does not support the audio element.
				</audio>
			</div>
		</Fragment>
	);
}

//----------------------------------------------------------------------------------------------------------------------------------
// const secondFetch = song => {
// 	fetch("https://assets.breatheco.de/apis/sound/".concat(song[0].url), {
// 		method: "GET",
// 		mode: "no-cors",
// 		redirect: "follow"
// 	})
// 		.then(function(response) {
// 			if (!response.ok) {
// 				console.log(response);
// 				throw Error("Ha ido mal");
// 			}
// 			return response.json();
// 		})
// 		.then(function(music) {
// 			console.log(music);
// 		})
// 		.catch(function(error) {
// 			console.log(error);
// 		});
// };
