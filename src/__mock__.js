export const get = path => {
  switch (path) {
    case "/groups":
      return JSON.parse(`
      { "data": {
        "1": {
            "name": "Living Room",
            "lights": [
                "5",
                "6",
                "7",
                "8",
                "1",
                "4"
            ],
            "sensors": [],
            "type": "Room",
            "state": {
                "all_on": true,
                "any_on": true
            },
            "recycle": false,
            "class": "Living room",
            "action": {
                "on": true,
                "bri": 147,
                "hue": 54003,
                "sat": 192,
                "effect": "none",
                "xy": [
                    0.3610,
                    0.2017
                ],
                "ct": 219,
                "alert": "select",
                "colormode": "xy"
            }
        },
        "2": {
            "name": "Bedroom",
            "lights": [
                "2",
                "3"
            ],
            "sensors": [],
            "type": "Room",
            "state": {
                "all_on": true,
                "any_on": true
            },
            "recycle": false,
            "class": "Bedroom",
            "action": {
                "on": true,
                "bri": 137,
                "hue": 8418,
                "sat": 140,
                "effect": "none",
                "xy": [
                    0.1553,
                    0.2176
                ],
                "ct": 366,
                "alert": "select",
                "colormode": "xy"
            }
        },
        "3": {
            "name": "All",
            "lights": [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8"
            ],
            "sensors": [],
            "type": "LightGroup",
            "state": {
                "all_on": true,
                "any_on": true
            },
            "recycle": true,
            "action": {
                "on": true,
                "bri": 152,
                "hue": 54003,
                "sat": 192,
                "effect": "none",
                "xy": [
                    0.3610,
                    0.2017
                ],
                "ct": 233,
                "alert": "select",
                "colormode": "ct"
            }
        }
    }}
      `);
    case "/lights":
      return JSON.parse(`
        { "data": {
          "1": {
              "state": {
                  "on": true,
                  "bri": 147,
                  "hue": 59326,
                  "sat": 241,
                  "effect": "none",
                  "xy": [
                      0.5035,
                      0.2284
                  ],
                  "ct": 447,
                  "alert": "select",
                  "colormode": "xy",
                  "mode": "homeautomation",
                  "reachable": true
              },
              "swupdate": {
                  "state": "noupdates",
                  "lastinstall": "2018-12-29T07:50:55"
              },
              "type": "Extended color light",
              "name": "Hue color lamp 1",
              "modelid": "LCT016",
              "manufacturername": "Philips",
              "productname": "Hue color lamp",
              "capabilities": {
                  "certified": true,
                  "control": {
                      "mindimlevel": 1000,
                      "maxlumen": 800,
                      "colorgamuttype": "C",
                      "colorgamut": [
                          [
                              0.6915,
                              0.3083
                          ],
                          [
                              0.1700,
                              0.7000
                          ],
                          [
                              0.1532,
                              0.0475
                          ]
                      ],
                      "ct": {
                          "min": 153,
                          "max": 500
                      }
                  },
                  "streaming": {
                      "renderer": true,
                      "proxy": true
                  }
              },
              "config": {
                  "archetype": "sultanbulb",
                  "function": "mixed",
                  "direction": "omnidirectional",
                  "startup": {
                      "mode": "safety",
                      "configured": true
                  }
              },
              "uniqueid": "00:17:88:01:03:ab:7c:2b-0b",
              "swversion": "1.46.13_r26312",
              "swconfigid": "9DC82D22",
              "productid": "Philips-LCT016-1-A19ECLv5"
          },
          "2": {
              "state": {
                  "on": true,
                  "bri": 137,
                  "hue": 8418,
                  "sat": 140,
                  "effect": "none",
                  "xy": [
                      0.1553,
                      0.2176
                  ],
                  "ct": 366,
                  "alert": "select",
                  "colormode": "xy",
                  "mode": "homeautomation",
                  "reachable": false
              },
              "swupdate": {
                  "state": "noupdates",
                  "lastinstall": "2018-12-29T07:50:58"
              },
              "type": "Extended color light",
              "name": "Hue color lamp 2",
              "modelid": "LCT016",
              "manufacturername": "Philips",
              "productname": "Hue color lamp",
              "capabilities": {
                  "certified": true,
                  "control": {
                      "mindimlevel": 1000,
                      "maxlumen": 800,
                      "colorgamuttype": "C",
                      "colorgamut": [
                          [
                              0.6915,
                              0.3083
                          ],
                          [
                              0.1700,
                              0.7000
                          ],
                          [
                              0.1532,
                              0.0475
                          ]
                      ],
                      "ct": {
                          "min": 153,
                          "max": 500
                      }
                  },
                  "streaming": {
                      "renderer": true,
                      "proxy": true
                  }
              },
              "config": {
                  "archetype": "sultanbulb",
                  "function": "mixed",
                  "direction": "omnidirectional",
                  "startup": {
                      "mode": "safety",
                      "configured": true
                  }
              },
              "uniqueid": "00:17:88:01:03:d0:ad:49-0b",
              "swversion": "1.46.13_r26312",
              "swconfigid": "9DC82D22",
              "productid": "Philips-LCT016-1-A19ECLv5"
          },
          "3": {
              "state": {
                  "on": true,
                  "bri": 137,
                  "hue": 8418,
                  "sat": 140,
                  "effect": "none",
                  "xy": [
                      0.1553,
                      0.2176
                  ],
                  "ct": 366,
                  "alert": "select",
                  "colormode": "xy",
                  "mode": "homeautomation",
                  "reachable": false
              },
              "swupdate": {
                  "state": "noupdates",
                  "lastinstall": "2018-12-29T07:50:52"
              },
              "type": "Extended color light",
              "name": "Hue color lamp 3",
              "modelid": "LCT016",
              "manufacturername": "Philips",
              "productname": "Hue color lamp",
              "capabilities": {
                  "certified": true,
                  "control": {
                      "mindimlevel": 1000,
                      "maxlumen": 800,
                      "colorgamuttype": "C",
                      "colorgamut": [
                          [
                              0.6915,
                              0.3083
                          ],
                          [
                              0.1700,
                              0.7000
                          ],
                          [
                              0.1532,
                              0.0475
                          ]
                      ],
                      "ct": {
                          "min": 153,
                          "max": 500
                      }
                  },
                  "streaming": {
                      "renderer": true,
                      "proxy": true
                  }
              },
              "config": {
                  "archetype": "sultanbulb",
                  "function": "mixed",
                  "direction": "omnidirectional",
                  "startup": {
                      "mode": "safety",
                      "configured": true
                  }
              },
              "uniqueid": "00:17:88:01:03:b8:b3:14-0b",
              "swversion": "1.46.13_r26312",
              "swconfigid": "9DC82D22",
              "productid": "Philips-LCT016-1-A19ECLv5"
          },
          "4": {
              "state": {
                  "on": true,
                  "bri": 147,
                  "hue": 54003,
                  "sat": 192,
                  "effect": "none",
                  "xy": [
                      0.3610,
                      0.2017
                  ],
                  "ct": 219,
                  "alert": "select",
                  "colormode": "xy",
                  "mode": "homeautomation",
                  "reachable": true
              },
              "swupdate": {
                  "state": "noupdates",
                  "lastinstall": "2018-12-29T07:50:34"
              },
              "type": "Extended color light",
              "name": "Hue color lamp 4",
              "modelid": "LCT016",
              "manufacturername": "Philips",
              "productname": "Hue color lamp",
              "capabilities": {
                  "certified": true,
                  "control": {
                      "mindimlevel": 1000,
                      "maxlumen": 800,
                      "colorgamuttype": "C",
                      "colorgamut": [
                          [
                              0.6915,
                              0.3083
                          ],
                          [
                              0.1700,
                              0.7000
                          ],
                          [
                              0.1532,
                              0.0475
                          ]
                      ],
                      "ct": {
                          "min": 153,
                          "max": 500
                      }
                  },
                  "streaming": {
                      "renderer": true,
                      "proxy": true
                  }
              },
              "config": {
                  "archetype": "sultanbulb",
                  "function": "mixed",
                  "direction": "omnidirectional",
                  "startup": {
                      "mode": "safety",
                      "configured": true
                  }
              },
              "uniqueid": "00:17:88:01:03:f3:43:59-0b",
              "swversion": "1.46.13_r26312",
              "swconfigid": "9DC82D22",
              "productid": "Philips-LCT016-1-A19ECLv5"
          },
          "5": {
              "state": {
                  "on": true,
                  "bri": 152,
                  "ct": 233,
                  "alert": "select",
                  "colormode": "ct",
                  "mode": "homeautomation",
                  "reachable": true
              },
              "swupdate": {
                  "state": "noupdates",
                  "lastinstall": "2018-12-29T07:50:47"
              },
              "type": "Color temperature light",
              "name": "Hue ambiance spot 1",
              "modelid": "LTW013",
              "manufacturername": "Philips",
              "productname": "Hue ambiance spot",
              "capabilities": {
                  "certified": true,
                  "control": {
                      "mindimlevel": 1000,
                      "maxlumen": 250,
                      "ct": {
                          "min": 153,
                          "max": 454
                      }
                  },
                  "streaming": {
                      "renderer": false,
                      "proxy": false
                  }
              },
              "config": {
                  "archetype": "spotbulb",
                  "function": "functional",
                  "direction": "downwards",
                  "startup": {
                      "mode": "safety",
                      "configured": true
                  }
              },
              "uniqueid": "00:17:88:01:02:27:01:14-0b",
              "swversion": "1.46.13_r26312",
              "swconfigid": "1742FA88",
              "productid": "Philips-LTW013-1-GU10CTv1"
          },
          "6": {
              "state": {
                  "on": true,
                  "bri": 152,
                  "ct": 233,
                  "alert": "select",
                  "colormode": "ct",
                  "mode": "homeautomation",
                  "reachable": true
              },
              "swupdate": {
                  "state": "noupdates",
                  "lastinstall": "2018-12-29T07:50:44"
              },
              "type": "Color temperature light",
              "name": "Hue ambiance spot 2",
              "modelid": "LTW013",
              "manufacturername": "Philips",
              "productname": "Hue ambiance spot",
              "capabilities": {
                  "certified": true,
                  "control": {
                      "mindimlevel": 1000,
                      "maxlumen": 250,
                      "ct": {
                          "min": 153,
                          "max": 454
                      }
                  },
                  "streaming": {
                      "renderer": false,
                      "proxy": false
                  }
              },
              "config": {
                  "archetype": "spotbulb",
                  "function": "functional",
                  "direction": "downwards",
                  "startup": {
                      "mode": "safety",
                      "configured": true
                  }
              },
              "uniqueid": "00:17:88:01:02:27:0c:6a-0b",
              "swversion": "1.46.13_r26312",
              "swconfigid": "1742FA88",
              "productid": "Philips-LTW013-1-GU10CTv1"
          },
          "7": {
              "state": {
                  "on": true,
                  "bri": 152,
                  "ct": 233,
                  "alert": "select",
                  "colormode": "ct",
                  "mode": "homeautomation",
                  "reachable": true
              },
              "swupdate": {
                  "state": "noupdates",
                  "lastinstall": "2018-12-29T07:50:31"
              },
              "type": "Color temperature light",
              "name": "Hue ambiance spot 3",
              "modelid": "LTW013",
              "manufacturername": "Philips",
              "productname": "Hue ambiance spot",
              "capabilities": {
                  "certified": true,
                  "control": {
                      "mindimlevel": 1000,
                      "maxlumen": 250,
                      "ct": {
                          "min": 153,
                          "max": 454
                      }
                  },
                  "streaming": {
                      "renderer": false,
                      "proxy": false
                  }
              },
              "config": {
                  "archetype": "spotbulb",
                  "function": "functional",
                  "direction": "downwards",
                  "startup": {
                      "mode": "safety",
                      "configured": true
                  }
              },
              "uniqueid": "00:17:88:01:02:27:05:d5-0b",
              "swversion": "1.46.13_r26312",
              "swconfigid": "1742FA88",
              "productid": "Philips-LTW013-1-GU10CTv1"
          },
          "8": {
              "state": {
                  "on": true,
                  "bri": 152,
                  "ct": 233,
                  "alert": "select",
                  "colormode": "ct",
                  "mode": "homeautomation",
                  "reachable": true
              },
              "swupdate": {
                  "state": "noupdates",
                  "lastinstall": "2018-12-29T07:50:37"
              },
              "type": "Color temperature light",
              "name": "Hue ambiance spot 4",
              "modelid": "LTW013",
              "manufacturername": "Philips",
              "productname": "Hue ambiance spot",
              "capabilities": {
                  "certified": true,
                  "control": {
                      "mindimlevel": 1000,
                      "maxlumen": 250,
                      "ct": {
                          "min": 153,
                          "max": 454
                      }
                  },
                  "streaming": {
                      "renderer": false,
                      "proxy": false
                  }
              },
              "config": {
                  "archetype": "spotbulb",
                  "function": "functional",
                  "direction": "downwards",
                  "startup": {
                      "mode": "safety",
                      "configured": true
                  }
              },
              "uniqueid": "00:17:88:01:02:27:05:f1-0b",
              "swversion": "1.46.13_r26312",
              "swconfigid": "1742FA88",
              "productid": "Philips-LTW013-1-GU10CTv1"
          }
      }}      
        `);
    default:
      return {};
  }
};
