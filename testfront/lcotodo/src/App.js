import React from "react";
import logo from "./LCO-logo.png";
import "./App.css";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newItem: "",
			list: [],
		};
	}
	addItem(todoValue) {
		if (todoValue !== "") {
			const newItem = {
				id: Date.now(),
				value: todoValue,
				isDone: false,
			};
			const list = [...this.state.list];
			list.push(newItem);
			this.setState({
				list,
				newItem: "",
			});
		}
	}
	deleteItem(id) {
		const list = [...this.state.list];
		const updatedList = list.filter((item) => item.id !== id);
		this.setState({ list: updatedList });
	}
	updateInput(input) {
		this.setState({ newItem: input });
	}
	render() {
		return (
			<div>
				<img src={logo} width="100" height="100" className="logo" alt="ima" />
				<h1 className="app-title">TO DO App</h1>
				<div className="container">
					Add an Item.....
					<br />
					<input
						type="text"
						className="input-text"
						placeholder="write a TODO"
						required
						value={this.state.newItem}
						onChange={(e) => this.updateInput(e.target.value)}
					/>
					<button
						className="add-btn"
						onClick={() => this.addItem(this.state.newItem)}
						disabled={!this.state.newItem.length}
					>
						Add ToDo
					</button>
				</div>
				<div className="list">
					<ul>
						{this.state.list.map((item) => {
							return (
								<li key={item.id}>
									<input
										type="checkbox"
										name="idDone"
										checked={item.isDone}
										onChange={() => {}}
									/>
									{item.value}
									<button
										className="btn"
										onClick={() => this.deleteItem(item.id)}
									>
										Delete
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}

export default App;
