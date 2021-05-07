import React, { useState, useEffect } from "react";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
//create your first component
export function Home() {
	const [listOfSongs, setListOfSongs] = useState([]);
	console.log(listOfSongs);
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
	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!</h1>
			<p>
				<img src={rigoImage} />
			</p>
			<a href="#" className="btn btn-success">
				If you see this green button... bootstrap is working
			</a>
			<p>
				Made by{" "}
				<a href="http://www.4geeksacademy.com">4Geeks Academy</a>, with
				love!
			</p>
		</div>
	);
}
