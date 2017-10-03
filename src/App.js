import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import http from 'axios';

class App extends Component {
    constructor() {
        super();
        this.state = {
            username: 'bareinhard',
            repo: 'hacktoberfest-mathematics',
            rootContent: [],
            rootDirectories: [],
            currentDirectory: [],
            displayCode: false,
            code: '',
            rootTree: [],
            codeContent: {},
        };
        this.loadFiles();
    }
    getRootFiles = async () => {
        let rootContent = await http
            .get(`https://api.github.com/repos/${this.state.username}/${this.state.repo}/contents/`)
            .then(res => res.data);
        let rootTree = [];
        let codeContent = {};
        for (let dir of rootContent) {
            if (dir.size === 0) {
                let treeObject = await http
                    .get(
                        `https://api.github.com/repos/${this.state.username}/${this.state
                            .repo}/git/trees/${dir.sha}?recursive=1`,
                    )
                    .then(res => res.data);
                treeObject.name = dir.name;
                treeObject.path = dir.path;
                treeObject.tree.forEach(files => {
                    codeContent[files.path] = '...';
                }),
                    rootTree.push(treeObject);
            }
        }

        let rootDirectories = rootContent.filter(file => file.size === 0);
        console.log(rootTree);

        this.setState({ rootContent, rootDirectories, rootTree, codeContent });
    };
    loadFiles = async () => {
        this.getRootFiles('bareinhard', 'hacktoberfest-mathematics');
    };
    clickDirectory = event => {
        let path = event.target.className;
        http
            .get(`https://api.github.com/repos/${this.state.username}/${this.state.repo}/contents/${path}?ref=master`)
            .then(res => {
                let newRoot = res.data;
                console.log(newRoot);
                let codeContent = {};
                newRoot.forEach(rootDir =>
                    rootDir.tree.forEach(files => {
                        codeContent[files.path] = '...';
                    }),
                );
                this.setState({ codeContent, currentDirectory: Array(...newRoot) });
            });
    };
    displayCode = async event => {
        let path = event.target.className;
        let res = await http.get(`${path}`).then(res => res.data);
        console.log(res);
        this.setState({
            code: atob(res.content),
            displayCode: true,
        });
    };
    filerSubDirectories = event => {
        let path = event.target.className;
        let currentDirectory = this.state.rootTree.filter(dir => dir.sha === path);
        console.log(currentDirectory);
        currentDirectory = currentDirectory[0].tree.filter(dir => !dir.path.includes('/'));
        this.setState({ currentDirectory });
    };
    loadCode = async event => {
        let path = event.target.className;
        let code = await http
            .get(`https://api.github.com/repos/${this.state.username}/${this.state.repo}/contents/${path}?ref=master`)
            .then(res => res.data);
        let newPath = path.split('/');
        let finalPath = '';
        for (let sub of newPath) {
            if (sub === newPath[1] && sub !== newPath[0]) {
                finalPath += sub;
            } else if (sub !== newPath[0]) {
                finalPath += '/' + sub;
            }
        }
        console.log(finalPath, this.state.codeContent);
        this.setState({
            codeContent: Object.assign({}, this.state.codeContent, { [finalPath]: atob(code.content) }),
        });
    };
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <svg
                        className="hacksvg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="626"
                        height="145"
                        viewBox="0 0 626 145"
                        role="img"
                        aria-labelledby="dyn2wm4vin1xgraye3ggy9kf12oaz8a"
                        class="Hero-logo"
                    >
                        <title id="dyn2wm4vin1xgraye3ggy9kf12oaz8a">Hacktoberfest</title>
                        <defs>
                            <filter
                                x="-5.2%"
                                y="-26.4%"
                                width="110.5%"
                                height="156.4%"
                                filterUnits="objectBoundingBox"
                                id="hacktoberfest-logo-filter"
                            >
                                <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
                                <feGaussianBlur stdDeviation="10" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
                                <feColorMatrix
                                    values="0 0 0 0 0.0543056342 0 0 0 0 0.0216903168 0 0 0 0 0.140306122 0 0 0 0.542204484 0"
                                    in="shadowBlurOuter1"
                                    result="shadowMatrixOuter1"
                                />
                                <feMerge>
                                    <feMergeNode in="shadowMatrixOuter1" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <g
                            filter="url(#hacktoberfest-logo-filter)"
                            transform="translate(18 15)"
                            fill="none"
                            fill-rule="evenodd"
                        >
                            <polygon
                                fill="#FF625F"
                                points="254.825045 32.8595485 242.037834 32.8595485 242.037834 23.2628287 219.660869 45.6548844 229.251494 45.6548844 229.251494 103.232588 235.644664 109.630692 242.037834 103.232588 251.62846 93.6358686 248.431004 90.4372525 242.037834 96.8353562 242.037834 45.6548844"
                            />
                            <polygon
                                fill="#FF9566"
                                points="232.389896 106.374205 235.643967 109.630343 242.038008 103.233111 251.628634 93.6363915 248.431178 90.4377754 242.038008 96.8358791"
                            />
                            <polygon
                                fill="#FF9566"
                                points="463.583556 23.263003 463.583556 23.263003 463.583556 10.4676672 450.795474 23.263003 450.795474 36.0583389 441.205719 45.6541871 450.795474 45.6541871 450.795474 103.232763 457.189515 109.630866 463.583556 103.232763 463.583556 45.6541871 476.370766 32.8597228 463.583556 32.8597228"
                            />
                            <polygon
                                fill="#FF625F"
                                points="441.205458 45.6545357 450.796083 45.6545357 463.583294 45.6545357 476.370505 32.8591999 450.796083 32.8591999"
                            />
                            <polygon
                                fill="#FF625F"
                                points="482.763501 10.4680158 473.172875 0.871296046 463.58312 10.4680158 473.172875 20.0647356"
                            />
                            <polygon
                                fill="#FF625F"
                                points="320.861438 42.4560068 320.861438 32.859287 320.861438 16.8653351 311.270812 7.26861535 301.681057 16.8653351 308.074227 23.2634388 308.074227 96.8359663 320.861438 109.630431 330.452064 100.033711 320.861438 90.4378626"
                            />
                            <polygon
                                fill="#FF9566"
                                points="320.861438 42.4560068 320.861438 32.859287 320.861438 16.8653351 308.074227 23.2634388 308.074227 96.8359663 320.861438 90.4378626"
                            />
                            <polygon
                                fill="#FF625F"
                                points="320.861438 42.4560068 330.452064 52.0527266 330.452064 100.033711 343.238404 87.2392465 343.238404 45.6546229 330.452064 32.859287"
                            />
                            <polygon
                                fill="#FF625F"
                                points="67.1776697 96.186133 60.4596153 89.4638099 60.4596153 79.3816326 60.4596153 28.9655167 60.4596153 15.5217421 60.4596153 12.1610163 50.3829692 2.07709586 40.3063231 12.1610163 47.0243775 18.8833394 47.0243775 35.6050418 30.3124224 52.3276158 30.3124224 28.9655167 30.3124224 12.1610163 20.2357763 2.07709586 20.1948391 2.11893063 20.1530309 2.07709586 0.00060970285 22.2440652 3.44194679 25.6875889 13.5185929 15.60454 16.8771846 18.9652658 16.8771846 102.908456 23.595239 109.630779 30.3124224 102.908456 30.3124224 66.8111586 47.0243775 50.0885846 47.0243775 79.3816326 47.0243775 96.186133 60.4596153 109.630779 67.1776697 102.908456 70.5362614 99.5468588 77.2543158 92.8254072 73.8957241 89.4638099"
                            />
                            <polygon
                                fill="#FF9566"
                                points="60.4597024 89.4639842 60.4597024 79.3818069 60.4597024 28.965691 60.4597024 15.5219164 60.4597024 12.1611906 47.0244646 18.8835137 47.0244646 35.6052161 47.0244646 50.0887589 47.0244646 79.3818069 47.0244646 96.1863073"
                            />
                            <polygon
                                fill="#FF625F"
                                points="578.593546 96.8356177 578.593546 45.6542743 591.380757 32.85981 578.594417 32.85981 578.594417 23.2630902 556.216581 45.6542743 565.806335 45.6542743 565.806335 103.23285 572.200376 109.630953 578.593546 103.23285 588.184172 93.63613 584.987587 90.4375139"
                            />
                            <polygon
                                fill="#FF9566"
                                points="578.593546 96.8356177 578.593546 45.6542743 565.806335 45.6542743 565.806335 103.23285 569.31474 106.742612"
                            />
                            <polygon
                                fill="#FF625F"
                                points="272.928081 42.4560068 260.14087 55.2513427 260.14087 96.8359663 272.928081 109.630431 282.518707 100.033711 272.928081 90.4378626"
                            />
                            <polygon
                                fill="#FF9566"
                                points="272.928081 42.4560068 260.14087 55.2513427 260.14087 96.8359663 272.928081 90.4378626"
                            />
                            <polygon
                                fill="#FF625F"
                                points="272.928081 42.4560068 282.518707 52.0527266 282.518707 100.033711 295.305046 87.2392465 295.305046 45.6546229 282.518707 32.859287"
                            />
                            <polygon
                                fill="#FF625F"
                                points="390.015242 45.5753983 377.307292 32.8593742 367.716667 42.456094 377.228031 51.973502 367.716667 61.4909101 367.716667 42.456094 354.929456 55.2514298 354.929456 96.8351819 367.716667 109.630518 374.109836 103.232414 377.307292 100.033798 386.897047 90.4379497 383.700462 87.2393337 374.109836 96.8351819 367.716667 90.4379497 367.716667 67.8881422"
                            />
                            <polygon
                                fill="#FF9566"
                                points="367.717015 42.4560068 367.717015 61.4908229 367.717015 42.4560068 354.928933 55.2513427 354.928933 96.8359663 367.717015 90.4378626 367.717015 67.888055"
                            />
                            <polygon
                                fill="#FF625F"
                                points="98.1595459 42.4560068 85.3723351 55.2513427 85.3723351 96.8359663 98.1595459 109.630431 107.749301 100.033711 98.1595459 90.4378626"
                            />
                            <polygon
                                fill="#FF625F"
                                points="120.536424 45.6545357 107.749214 32.8591999 98.1594588 42.4559197 107.749214 52.0526394 107.749214 100.034495 117.339839 109.630343 126.930465 100.034495 120.536424 93.6363915"
                            />
                            <polygon
                                fill="#FF9566"
                                points="120.536424 45.6545357 107.749214 52.0526394 107.749214 100.034495 117.339839 109.630343 126.930465 100.034495 120.536424 93.6363915"
                            />
                            <polygon
                                fill="#FF625F"
                                points="154.702082 96.8356177 148.308912 90.4375139 148.308912 42.4556582 135.521701 55.250994 135.521701 96.8356177 148.308912 109.630953 154.702082 103.23285 157.899538 100.034234 167.489292 90.4375139 164.292708 87.2388979"
                            />
                            <polygon
                                fill="#FF9566"
                                points="148.308999 90.4376011 148.308999 42.4557453 135.521788 55.2510812 135.521788 96.8357048"
                            />
                            <polygon
                                fill="#FF625F"
                                points="148.308999 42.3658006 157.899625 51.9625204 167.48938 42.3658006 157.899625 32.7690808"
                            />
                            <polygon
                                fill="#FF625F"
                                points="200.498692 32.8595485 190.908066 42.4562683 200.498692 52.0521165 210.088447 42.4562683"
                            />
                            <polygon
                                fill="#FF625F"
                                points="197.301323 68.0460684 197.301323 103.232588 203.695364 109.630692 210.088534 103.232588 210.088534 61.6479647 200.498779 52.0521165 190.908153 61.6479647"
                            />
                            <polygon
                                fill="#FF625F"
                                points="190.90824 32.8595485 190.90824 16.864725 181.317614 7.26887681 171.72786 16.864725 178.121029 23.2628287 178.121029 103.232588 184.514199 109.630692 190.90824 103.232588 190.90824 61.6479647 190.90824 42.4562683"
                            />
                            <polygon
                                fill="#FF9566"
                                points="190.90824 32.8595485 190.90824 16.864725 178.121029 23.2628287 178.121029 103.232588 184.514199 109.630692 190.90824 103.232588 190.90824 61.6479647 190.90824 42.4562683"
                            />
                            <polygon
                                fill="#FF625F"
                                points="493.377208 42.4560068 502.888572 51.9734149 493.377208 61.4908229 493.377208 42.4560068 480.589997 55.2513427 480.589997 96.8359663 493.377208 109.630431 499.770378 103.232327 502.967834 100.033711 512.557589 90.4378626 509.361004 87.2392465 499.770378 96.8359663 493.377208 90.4378626 493.377208 67.888055 515.675783 45.5753112 502.967834 32.859287"
                            />
                            <polygon
                                fill="#FF9566"
                                points="493.377208 61.4907357 493.377208 42.4559197 480.589997 55.2512555 480.589997 96.8358791 493.377208 90.4377754 493.377208 67.8879679"
                            />
                            <polygon
                                fill="#FF625F"
                                points="415.650285 42.4560068 425.24004 52.0527266 434.830666 42.4560068 425.24004 32.859287"
                            />
                            <polygon
                                fill="#FF625F"
                                points="396.469469 42.4560068 402.862639 48.853239 402.862639 58.4499587 402.862639 68.045807 402.862639 103.232327 409.25668 109.630431 415.64985 103.232327 415.64985 68.045807 415.64985 58.4499587 415.64985 42.4560068 406.060095 32.859287"
                            />
                            <polygon
                                fill="#FF9566"
                                points="402.862552 48.8531518 402.862552 58.4498716 402.862552 68.0457198 402.862552 103.233111 409.256593 109.630343 415.650634 103.233111 415.650634 68.0457198 415.650634 58.4498716 415.650634 42.4559197"
                            />
                            <polygon
                                fill="#FF625F"
                                points="524.248467 100.034147 533.839092 109.630866 543.428847 100.034147 533.839092 90.4374268"
                            />
                            <polygon
                                fill="#FF625F"
                                points="553.019734 42.4560068 543.429108 32.859287 533.839354 42.4560068 543.429108 52.0527266"
                            />
                            <polygon
                                fill="#FF625F"
                                points="524.248467 52.0525523 524.248467 64.8478881 543.428847 84.0395846 543.428847 100.034408 553.019473 90.4376883 553.019473 74.4437363 551.421181 72.8435567 543.428847 64.8478881 533.839092 55.2511683 533.839092 42.4558325"
                            />
                            <polygon
                                fill="#FF9566"
                                points="524.248467 64.8475395 543.428847 84.0401075 553.019473 74.4442593 551.421181 72.8440797 543.428847 64.8475395 533.839092 55.2508197"
                            />
                            <polygon
                                fill="#FF9566"
                                points="254.825045 32.8595485 232.448079 32.8595485 219.660869 45.6548844 229.251494 45.6548844 242.037834 45.6548844"
                            />
                        </g>
                    </svg>

                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                {this.state.rootTree.map(directory => (
                    <button onClick={this.filerSubDirectories} className={directory.sha} key={directory.sha}>
                        {directory.name}
                    </button>
                ))}
                <ol>
                    {this.state.currentDirectory.map(
                        dir =>
                            !dir.path.includes('/') ? (
                                <a key={dir.sha} href={`#${dir.path}`}>
                                    <li>{dir.path}</li>
                                </a>
                            ) : (
                                ''
                            ),
                    )}
                </ol>
                <div className="content-container">
                    {this.state.rootTree.map(dir => (
                        <div key={dir.path} className="content">
                            <h3 className="content-header">{dir.name}</h3>
                            {dir.tree.map(subdir => {
                                let subs = [];

                                return !subdir.path.includes('/') ? (
                                    <div key={`${dir.path}/toplevel${subdir.path}`} className="sub-content">
                                        <h4 className="subcontent-header" id={subdir.path}>
                                            {subdir.path}
                                        </h4>
                                        {dir.tree.map(subsubdir => {
                                            let subName = subsubdir.path.split('/');

                                            if (
                                                subsubdir.path.includes('/') &&
                                                subName[0] === subdir.path &&
                                                !subs.includes(subName[1])
                                            ) {
                                                console.log(subName, !subs.includes(subName), subs);
                                                subs.push(subName[1]);
                                                return (
                                                    <div
                                                        className="language-sub-content"
                                                        key={`${dir.path}/${subName[1]}`}
                                                    >
                                                        <h5 className="language-subcontent-header">
                                                            Language:{' '}
                                                            <span className="language">
                                                                {subsubdir.path.split('/')[1]}
                                                            </span>
                                                        </h5>
                                                        {dir.tree.map(
                                                            files =>
                                                                files.path.includes(subName[0] + '/' + subName[1]) &&
                                                                files.path.includes('.') ? (
                                                                    <div key={`${dir.path}/${files.path}`}>
                                                                        <h4 className="file-name-header">
                                                                            File Name:{' '}
                                                                            <span className="file-name">
                                                                                {
                                                                                    files.path.split('/')[
                                                                                        files.path.split('/').length - 1
                                                                                    ]
                                                                                }
                                                                            </span>
                                                                        </h4>
                                                                        <button
                                                                            className={`${dir.path}/${files.path}`}
                                                                            onClick={this.loadCode}
                                                                        >
                                                                            View Code
                                                                        </button>
                                                                        <div style={{ textAlign: 'left' }}>
                                                                            <pre>
                                                                                {this.state.codeContent[files.path]}
                                                                            </pre>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    ''
                                                                ),
                                                        )}
                                                    </div>
                                                );
                                            } else {
                                                return '';
                                            }
                                        })}
                                    </div>
                                ) : (
                                    ''
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Display Code*/}
            </div>
        );
    }
}

export default App;
