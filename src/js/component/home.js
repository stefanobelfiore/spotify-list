import React, { useState, useEffect, Fragment } from "react";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
//create your first component
export function Home() {
	let mainUrl = "https://assets.breatheco.de/apis/sound/";
	const [listOfSongs, setListOfSongs] = useState([]); //----------------Array cada fichero canción

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
		<Fragment>
			<div className="text-center mt-5">
				<h1>Yours songs, it`s friday and your body knows it</h1>

				{listOfSongs.map(oneSong => {
					return (
						<div
							className={mainUrl.concat(oneSong.url)}
							key={oneSong.url}
							onClick={() => {
								setUrlSong(mainUrl.concat(oneSong.url));
								console.log(oneSong, "mysinglesong");
								setplaySong(true);
							}}>
							{oneSong.name}
						</div>
					);
				})}
				<div className="centering">
					<button>
						<i className="fa fa-backward" />
					</button>
					<button>
						<i className="fa fa-pause" />
					</button>
					<button className="push--skeuo">
						<i className="fa fa-play" />
					</button>
					<button>
						<i className="fa fa-forward" />
					</button>
				</div>
				<audio id="player">
					<source src={urlSong} type="audio/mpeg" />
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
