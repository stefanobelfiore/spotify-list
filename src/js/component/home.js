import React, { useState, useEffect } from "react";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
//create your first component
export function Home() {
	const [listOfSongs, setListOfSongs] = useState([]); //----------------Array cada fichero canción
	console.log(listOfSongs, "fafafafafafaf");
	const [urlSong, setUrlSong] = useState(""); //--------------------string url cada canción
	const [playSong, setplaySong] = useState(false); //----------------------estado button play/pause

	useEffect(() => {
		getSongs();
	}, []);
	function getSongs() {
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
	}

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!</h1>

			{listOfSongs.map(oneSong => {
				return (
					<div
						className={"https://assets.breatheco.de/apis/sound/".concat(
							oneSong.url
						)}
						// key={oneSong.url}????????????????
						onClick={() => {
							setUrlSong(
								"https://assets.breatheco.de/apis/sound/".concat(
									oneSong.url
								)
							);

							setplaySong(true);
						}}>
						{oneSong.name}
					</div>
				);
			})}
		</div>
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
