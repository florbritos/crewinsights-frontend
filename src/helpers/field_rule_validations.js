const field_rules = {
    'id_user': [],
    'first_name':['required:true', 'type:string'],
    'last_name':['required:true', 'type:string'],
    'dob':['required:true', 'format:date', 'not_future'],
    'address':['required:true', 'type:string'],
    'nationality':['required:true', 'type:string'],
    'passport':['required:true', 'type:string'],
    'contact_number':['required:true', 'type:string'],
    'job_title':['required:true', 'type:string'],
    'avatar':['required:true', 'type:string'],
    'role':['required:true', 'type:string'],
    'email': ['required:true', 'format:email'],
    'password': ['required:true'],
    'flight_number': ['required:true'],
    'departure_airport': ['required:true', 'format:iata'],
    'arrival_airport': ['required:true', 'format:iata'],
    'schedule_departure_time': ['required:true', 'format:datetime', 'not_future'],
    'actual_departure_time': ['required:true', 'format:datetime', 'not_future'],
    'schedule_arrival_time': ['required:true', 'format:datetime', 'after:schedule_departure_time', 'not_future'],
    'actual_arrival_time': ['required:true', 'format:datetime', 'after:actual_departure_time', 'not_future'],
    'captain_name': ['required:true'],
    'first_officer_name': ['required:true'],
    'purser_name': ['required:true'],
    'number_cabin_crew': ['required:true', 'format:int', 'min:0'],
    'total_number_pax':['required:true', 'format:int', 'min:0'],
    'total_number_infants': ['required:true', 'format:int', 'min:0'],
    'total_number_pax_special_assistance':['required:true', 'format:int', 'min:0'],
    'delays':['format:boolean'],
    'reason_delay':['required:delays'],
    'diverted_emergency_landing':['format:boolean'],
    'reason_diverted_emergency_landing':['required:diverted_emergency_landing'],
    'technical_issues_aircraft':['format:boolean'],
    'reason_technical_issues_aircraft':['required:technical_issues_aircraft'],
    'safety_incident':['format:boolean'],
    'safety_incident_explanation':['required:safety_incident'],
    'safety_procedure_not_followed':['format:boolean'],
    'safety_procedure_not_followed_explanation':['required:safety_procedure_not_followed'],
    'medical_assistance':['format:boolean'],
    'medical_assistance_explanation':['required:medical_assistance'],
    'unruly_pax':['format:boolean'],
    'unruly_pax_explanation':['required:unruly_pax'],
    'damage_aircraft_equipment':['format:boolean'],
    'damage_aircraft_equipment_explanation':['required:damage_aircraft_equipment'],
    'service_not_completed':['format:boolean'],
    'service_not_completed_explanation':['required:service_not_completed'],
    'pax_complaints':['format:boolean'],
    'pax_complaints_explanation':['required:pax_complaints'],
    'additional_comments':[],
}

export function validateField(field, value, data = {}) {
    let error = ''
    const rules = field_rules[field]
    rules.some(rule => {
        const [rule_name, rule_value] = rule.split(':')
        
        if (rule_name === 'required'){
            if (rule_value === 'true' && value?.trim() === '' || value === null) {
                error = 'This field cannot be empty'
                return true
            }
            if (rule_value !== 'true') {
                if (data[rule_value] && value?.trim() === '' || value === null){
                    error = 'This field cannot be empty'
                    return true
                }
            }
        }

        if (rule_name === 'format') {
            if (rule_value === 'email') {
                const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                if (!regex.test(value)) {
                    error = 'Invalid email format'
                    return true
                }
            }
            if (rule_value === 'iata') {
                const regex = /^[A-Z]{3}$/
                if (!regex.test(value)) {
                    error = 'IATA code should be 3 letters'
                    return true
                }
            }
            if (rule_value === 'date') {
                const regex = /^\d{4}-\d{2}-\d{2}$/
                if (!regex.test(value)) {
                    error = 'Date format expected YYYY-MM-DD'
                    return true
                }
            }
            if (rule_value === 'time') {
                const regex = /^([01]\d|2[0-3]):([0-5]\d)$/
                if (!regex.test(value)) {
                    error = 'Time format expected HH:MM'
                    return true
                }
            }
            if (rule_value === 'datetime') {
                const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
                if (!regex.test(value)) {
                    error = 'Datetime format expected YYYY-MM-DDTHH:MM';
                    return true;
                }
            }
            if (rule_value === 'int') {
                if (!Number.isInteger(Number(value))) {
                    error = 'This field must be an integer'
                    return true
                }
            }
            if (rule_value === 'boolean') {
                if (typeof value !== 'boolean') {
                    error = 'This field must be true or false'
                    return true
                }
            }
        }
        if (rule_name === 'min') {
            const minValue = Number(rule_value);
            if (Number(value) < minValue) {
                error = `The value must be at least ${minValue}`;
                return true;
            }
        }
        if (rule_name === 'not_future') {
            const now = new Date(Date.now()).toISOString()
            if (value > now) {
                error = 'The date and time cannot be in the future';
                return true;
            }
        }
        if (rule_name === 'after') {
            const relatedField = data[rule_value];
            if (relatedField && new Date(value) < new Date(relatedField)) {
                error = `This time must be after ${rule_value.replaceAll('_', ' ')}`;
                return true;
            }
        }

        return false
    })
    return error
}

export function validateObjectFields(obj){
    const list_errors = {}
    for (let field in obj){
        const error = validateField(field, obj[field], obj)
        error && Object.assign(list_errors, { [field]: error })
    }

    return list_errors
}

export function currentDateTime(){
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
}

export function getDifferences(obj1, obj2) {
    const differences = {};
    for (const key in obj2) {
        if (obj2[key] !== obj1[key]) {
            differences[key] = obj2[key];
        }
    }
    return differences;
}

export const response = {
        'graph_data': {
            'data': [
                {
                    'alignmentgroup': 'True',
                    'hovertemplate': 'Cause=%{x}<br>Number of Incidents=%{y}<extra></extra>',
                    'legendgroup': '',
                    'marker': {
                        'color': '#636efa',
                        'pattern': {
                            'shape': ''
                        }
                    },
                    'name': '',
                    'offsetgroup': '',
                    'orientation': 'v',
                    'showlegend': false,
                    'textposition': 'auto',
                    'x': [
                        'Medical',
                        'Technical',
                        'Other'
                    ],
                    'xaxis': 'x',
                    'y': [
                        1,
                        0,
                        1
                    ],
                    'yaxis': 'y',
                    'type': 'bar'
                }
            ],
            'layout': {
                'template': {
                    'data': {
                        'histogram2dcontour': [
                            {
                                'type': 'histogram2dcontour',
                                'colorbar': {
                                    'outlinewidth': 0,
                                    'ticks': ''
                                },
                                'colorscale': [
                                    [
                                        0,
                                        '#0d0887'
                                    ],
                                    [
                                        0.1111111111111111,
                                        '#46039f'
                                    ],
                                    [
                                        0.2222222222222222,
                                        '#7201a8'
                                    ],
                                    [
                                        0.3333333333333333,
                                        '#9c179e'
                                    ],
                                    [
                                        0.4444444444444444,
                                        '#bd3786'
                                    ],
                                    [
                                        0.5555555555555556,
                                        '#d8576b'
                                    ],
                                    [
                                        0.6666666666666666,
                                        '#ed7953'
                                    ],
                                    [
                                        0.7777777777777778,
                                        '#fb9f3a'
                                    ],
                                    [
                                        0.8888888888888888,
                                        '#fdca26'
                                    ],
                                    [
                                        1,
                                        '#f0f921'
                                    ]
                                ]
                            }
                        ],
                        'choropleth': [
                            {
                                'type': 'choropleth',
                                'colorbar': {
                                    'outlinewidth': 0,
                                    'ticks': ''
                                }
                            }
                        ],
                        'histogram2d': [
                            {
                                'type': 'histogram2d',
                                'colorbar': {
                                    'outlinewidth': 0,
                                    'ticks': ''
                                },
                                'colorscale': [
                                    [
                                        0,
                                        '#0d0887'
                                    ],
                                    [
                                        0.1111111111111111,
                                        '#46039f'
                                    ],
                                    [
                                        0.2222222222222222,
                                        '#7201a8'
                                    ],
                                    [
                                        0.3333333333333333,
                                        '#9c179e'
                                    ],
                                    [
                                        0.4444444444444444,
                                        '#bd3786'
                                    ],
                                    [
                                        0.5555555555555556,
                                        '#d8576b'
                                    ],
                                    [
                                        0.6666666666666666,
                                        '#ed7953'
                                    ],
                                    [
                                        0.7777777777777778,
                                        '#fb9f3a'
                                    ],
                                    [
                                        0.8888888888888888,
                                        '#fdca26'
                                    ],
                                    [
                                        1,
                                        '#f0f921'
                                    ]
                                ]
                            }
                        ],
                        'heatmap': [
                            {
                                'type': 'heatmap',
                                'colorbar': {
                                    'outlinewidth': 0,
                                    'ticks': ''
                                },
                                'colorscale': [
                                    [
                                        0,
                                        '#0d0887'
                                    ],
                                    [
                                        0.1111111111111111,
                                        '#46039f'
                                    ],
                                    [
                                        0.2222222222222222,
                                        '#7201a8'
                                    ],
                                    [
                                        0.3333333333333333,
                                        '#9c179e'
                                    ],
                                    [
                                        0.4444444444444444,
                                        '#bd3786'
                                    ],
                                    [
                                        0.5555555555555556,
                                        '#d8576b'
                                    ],
                                    [
                                        0.6666666666666666,
                                        '#ed7953'
                                    ],
                                    [
                                        0.7777777777777778,
                                        '#fb9f3a'
                                    ],
                                    [
                                        0.8888888888888888,
                                        '#fdca26'
                                    ],
                                    [
                                        1,
                                        '#f0f921'
                                    ]
                                ]
                            }
                        ],
                        'heatmapgl': [
                            {
                                'type': 'heatmapgl',
                                'colorbar': {
                                    'outlinewidth': 0,
                                    'ticks': ''
                                },
                                'colorscale': [
                                    [
                                        0,
                                        '#0d0887'
                                    ],
                                    [
                                        0.1111111111111111,
                                        '#46039f'
                                    ],
                                    [
                                        0.2222222222222222,
                                        '#7201a8'
                                    ],
                                    [
                                        0.3333333333333333,
                                        '#9c179e'
                                    ],
                                    [
                                        0.4444444444444444,
                                        '#bd3786'
                                    ],
                                    [
                                        0.5555555555555556,
                                        '#d8576b'
                                    ],
                                    [
                                        0.6666666666666666,
                                        '#ed7953'
                                    ],
                                    [
                                        0.7777777777777778,
                                        '#fb9f3a'
                                    ],
                                    [
                                        0.8888888888888888,
                                        '#fdca26'
                                    ],
                                    [
                                        1,
                                        '#f0f921'
                                    ]
                                ]
                            }
                        ],
                        'contourcarpet': [
                            {
                                'type': 'contourcarpet',
                                'colorbar': {
                                    'outlinewidth': 0,
                                    'ticks': ''
                                }
                            }
                        ],
                        'contour': [
                            {
                                'type': 'contour',
                                'colorbar': {
                                    'outlinewidth': 0,
                                    'ticks': ''
                                },
                                'colorscale': [
                                    [
                                        0,
                                        '#0d0887'
                                    ],
                                    [
                                        0.1111111111111111,
                                        '#46039f'
                                    ],
                                    [
                                        0.2222222222222222,
                                        '#7201a8'
                                    ],
                                    [
                                        0.3333333333333333,
                                        '#9c179e'
                                    ],
                                    [
                                        0.4444444444444444,
                                        '#bd3786'
                                    ],
                                    [
                                        0.5555555555555556,
                                        '#d8576b'
                                    ],
                                    [
                                        0.6666666666666666,
                                        '#ed7953'
                                    ],
                                    [
                                        0.7777777777777778,
                                        '#fb9f3a'
                                    ],
                                    [
                                        0.8888888888888888,
                                        '#fdca26'
                                    ],
                                    [
                                        1,
                                        '#f0f921'
                                    ]
                                ]
                            }
                        ],
                        'surface': [
                            {
                                'type': 'surface',
                                'colorbar': {
                                    'outlinewidth': 0,
                                    'ticks': ''
                                },
                                'colorscale': [
                                    [
                                        0,
                                        '#0d0887'
                                    ],
                                    [
                                        0.1111111111111111,
                                        '#46039f'
                                    ],
                                    [
                                        0.2222222222222222,
                                        '#7201a8'
                                    ],
                                    [
                                        0.3333333333333333,
                                        '#9c179e'
                                    ],
                                    [
                                        0.4444444444444444,
                                        '#bd3786'
                                    ],
                                    [
                                        0.5555555555555556,
                                        '#d8576b'
                                    ],
                                    [
                                        0.6666666666666666,
                                        '#ed7953'
                                    ],
                                    [
                                        0.7777777777777778,
                                        '#fb9f3a'
                                    ],
                                    [
                                        0.8888888888888888,
                                        '#fdca26'
                                    ],
                                    [
                                        1,
                                        '#f0f921'
                                    ]
                                ]
                            }
                        ],
                        'mesh3d': [
                            {
                                'type': 'mesh3d',
                                'colorbar': {
                                    'outlinewidth': 0,
                                    'ticks': ''
                                }
                            }
                        ],
                        'scatter': [
                            {
                                'fillpattern': {
                                    'fillmode': 'overlay',
                                    'size': 10,
                                    'solidity': 0.2
                                },
                                'type': 'scatter'
                            }
                        ],
                        'parcoords': [
                            {
                                'type': 'parcoords',
                                'line': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                }
                            }
                        ],
                        'scatterpolargl': [
                            {
                                'type': 'scatterpolargl',
                                'marker': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                }
                            }
                        ],
                        'bar': [
                            {
                                'error_x': {
                                    'color': '#2a3f5f'
                                },
                                'error_y': {
                                    'color': '#2a3f5f'
                                },
                                'marker': {
                                    'line': {
                                        'color': '#E5ECF6',
                                        'width': 0.5
                                    },
                                    'pattern': {
                                        'fillmode': 'overlay',
                                        'size': 10,
                                        'solidity': 0.2
                                    }
                                },
                                'type': 'bar'
                            }
                        ],
                        'scattergeo': [
                            {
                                'type': 'scattergeo',
                                'marker': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                }
                            }
                        ],
                        'scatterpolar': [
                            {
                                'type': 'scatterpolar',
                                'marker': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                }
                            }
                        ],
                        'histogram': [
                            {
                                'marker': {
                                    'pattern': {
                                        'fillmode': 'overlay',
                                        'size': 10,
                                        'solidity': 0.2
                                    }
                                },
                                'type': 'histogram'
                            }
                        ],
                        'scattergl': [
                            {
                                'type': 'scattergl',
                                'marker': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                }
                            }
                        ],
                        'scatter3d': [
                            {
                                'type': 'scatter3d',
                                'line': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                },
                                'marker': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                }
                            }
                        ],
                        'scattermapbox': [
                            {
                                'type': 'scattermapbox',
                                'marker': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                }
                            }
                        ],
                        'scatterternary': [
                            {
                                'type': 'scatterternary',
                                'marker': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                }
                            }
                        ],
                        'scattercarpet': [
                            {
                                'type': 'scattercarpet',
                                'marker': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                }
                            }
                        ],
                        'carpet': [
                            {
                                'aaxis': {
                                    'endlinecolor': '#2a3f5f',
                                    'gridcolor': 'white',
                                    'linecolor': 'white',
                                    'minorgridcolor': 'white',
                                    'startlinecolor': '#2a3f5f'
                                },
                                'baxis': {
                                    'endlinecolor': '#2a3f5f',
                                    'gridcolor': 'white',
                                    'linecolor': 'white',
                                    'minorgridcolor': 'white',
                                    'startlinecolor': '#2a3f5f'
                                },
                                'type': 'carpet'
                            }
                        ],
                        'table': [
                            {
                                'cells': {
                                    'fill': {
                                        'color': '#EBF0F8'
                                    },
                                    'line': {
                                        'color': 'white'
                                    }
                                },
                                'header': {
                                    'fill': {
                                        'color': '#C8D4E3'
                                    },
                                    'line': {
                                        'color': 'white'
                                    }
                                },
                                'type': 'table'
                            }
                        ],
                        'barpolar': [
                            {
                                'marker': {
                                    'line': {
                                        'color': '#E5ECF6',
                                        'width': 0.5
                                    },
                                    'pattern': {
                                        'fillmode': 'overlay',
                                        'size': 10,
                                        'solidity': 0.2
                                    }
                                },
                                'type': 'barpolar'
                            }
                        ],
                        'pie': [
                            {
                                'automargin': true,
                                'type': 'pie'
                            }
                        ]
                    },
                    'layout': {
                        'autotypenumbers': 'strict',
                        'colorway': [
                            '#636efa',
                            '#EF553B',
                            '#00cc96',
                            '#ab63fa',
                            '#FFA15A',
                            '#19d3f3',
                            '#FF6692',
                            '#B6E880',
                            '#FF97FF',
                            '#FECB52'
                        ],
                        'font': {
                            'color': '#2a3f5f'
                        },
                        'hovermode': 'closest',
                        'hoverlabel': {
                            'align': 'left'
                        },
                        'paper_bgcolor': 'white',
                        'plot_bgcolor': '#E5ECF6',
                        'polar': {
                            'bgcolor': '#E5ECF6',
                            'angularaxis': {
                                'gridcolor': 'white',
                                'linecolor': 'white',
                                'ticks': ''
                            },
                            'radialaxis': {
                                'gridcolor': 'white',
                                'linecolor': 'white',
                                'ticks': ''
                            }
                        },
                        'ternary': {
                            'bgcolor': '#E5ECF6',
                            'aaxis': {
                                'gridcolor': 'white',
                                'linecolor': 'white',
                                'ticks': ''
                            },
                            'baxis': {
                                'gridcolor': 'white',
                                'linecolor': 'white',
                                'ticks': ''
                            },
                            'caxis': {
                                'gridcolor': 'white',
                                'linecolor': 'white',
                                'ticks': ''
                            }
                        },
                        'coloraxis': {
                            'colorbar': {
                                'outlinewidth': 0,
                                'ticks': ''
                            }
                        },
                        'colorscale': {
                            'sequential': [
                                [
                                    0,
                                    '#0d0887'
                                ],
                                [
                                    0.1111111111111111,
                                    '#46039f'
                                ],
                                [
                                    0.2222222222222222,
                                    '#7201a8'
                                ],
                                [
                                    0.3333333333333333,
                                    '#9c179e'
                                ],
                                [
                                    0.4444444444444444,
                                    '#bd3786'
                                ],
                                [
                                    0.5555555555555556,
                                    '#d8576b'
                                ],
                                [
                                    0.6666666666666666,
                                    '#ed7953'
                                ],
                                [
                                    0.7777777777777778,
                                    '#fb9f3a'
                                ],
                                [
                                    0.8888888888888888,
                                    '#fdca26'
                                ],
                                [
                                    1,
                                    '#f0f921'
                                ]
                            ],
                            'sequentialminus': [
                                [
                                    0,
                                    '#0d0887'
                                ],
                                [
                                    0.1111111111111111,
                                    '#46039f'
                                ],
                                [
                                    0.2222222222222222,
                                    '#7201a8'
                                ],
                                [
                                    0.3333333333333333,
                                    '#9c179e'
                                ],
                                [
                                    0.4444444444444444,
                                    '#bd3786'
                                ],
                                [
                                    0.5555555555555556,
                                    '#d8576b'
                                ],
                                [
                                    0.6666666666666666,
                                    '#ed7953'
                                ],
                                [
                                    0.7777777777777778,
                                    '#fb9f3a'
                                ],
                                [
                                    0.8888888888888888,
                                    '#fdca26'
                                ],
                                [
                                    1,
                                    '#f0f921'
                                ]
                            ],
                            'diverging': [
                                [
                                    0,
                                    '#8e0152'
                                ],
                                [
                                    0.1,
                                    '#c51b7d'
                                ],
                                [
                                    0.2,
                                    '#de77ae'
                                ],
                                [
                                    0.3,
                                    '#f1b6da'
                                ],
                                [
                                    0.4,
                                    '#fde0ef'
                                ],
                                [
                                    0.5,
                                    '#f7f7f7'
                                ],
                                [
                                    0.6,
                                    '#e6f5d0'
                                ],
                                [
                                    0.7,
                                    '#b8e186'
                                ],
                                [
                                    0.8,
                                    '#7fbc41'
                                ],
                                [
                                    0.9,
                                    '#4d9221'
                                ],
                                [
                                    1,
                                    '#276419'
                                ]
                            ]
                        },
                        'xaxis': {
                            'gridcolor': 'white',
                            'linecolor': 'white',
                            'ticks': '',
                            'title': {
                                'standoff': 15
                            },
                            'zerolinecolor': 'white',
                            'automargin': true,
                            'zerolinewidth': 2
                        },
                        'yaxis': {
                            'gridcolor': 'white',
                            'linecolor': 'white',
                            'ticks': '',
                            'title': {
                                'standoff': 15
                            },
                            'zerolinecolor': 'white',
                            'automargin': true,
                            'zerolinewidth': 2
                        },
                        'scene': {
                            'xaxis': {
                                'backgroundcolor': '#E5ECF6',
                                'gridcolor': 'white',
                                'linecolor': 'white',
                                'showbackground': true,
                                'ticks': '',
                                'zerolinecolor': 'white',
                                'gridwidth': 2
                            },
                            'yaxis': {
                                'backgroundcolor': '#E5ECF6',
                                'gridcolor': 'white',
                                'linecolor': 'white',
                                'showbackground': true,
                                'ticks': '',
                                'zerolinecolor': 'white',
                                'gridwidth': 2
                            },
                            'zaxis': {
                                'backgroundcolor': '#E5ECF6',
                                'gridcolor': 'white',
                                'linecolor': 'white',
                                'showbackground': true,
                                'ticks': '',
                                'zerolinecolor': 'white',
                                'gridwidth': 2
                            }
                        },
                        'shapedefaults': {
                            'line': {
                                'color': '#2a3f5f'
                            }
                        },
                        'annotationdefaults': {
                            'arrowcolor': '#2a3f5f',
                            'arrowhead': 0,
                            'arrowwidth': 1
                        },
                        'geo': {
                            'bgcolor': 'white',
                            'landcolor': '#E5ECF6',
                            'subunitcolor': 'white',
                            'showland': true,
                            'showlakes': true,
                            'lakecolor': 'white'
                        },
                        'title': {
                            'x': 0.05
                        },
                        'mapbox': {
                            'style': 'light'
                        }
                    }
                },
                'xaxis': {
                    'anchor': 'y',
                    'domain': [
                        0,
                        1
                    ],
                    'title': {
                        'text': 'Cause',
                        'font': {
                            'size': 14
                        }
                    }
                },
                'yaxis': {
                    'anchor': 'x',
                    'domain': [
                        0,
                        1
                    ],
                    'title': {
                        'text': 'Number of Incidents',
                        'font': {
                            'size': 14
                        }
                    }
                },
                'legend': {
                    'tracegroupgap': 0,
                    'font': {
                        'size': 12
                    }
                },
                'title': {
                    'text': 'Emergency Landings by Cause',
                    'font': {
                        'size': 16
                    }
                },
                'barmode': 'relative',
                'margin': {
                    'l': 50,
                    'r': 50,
                    't': 50,
                    'b': 50
                },
                'width': 500,
                'height': 400
            }
        },
        'id_metric': '6742a4f952f270306f5e62d7',
        'analysis': `Based on the flight reports, the following flights experienced delays:

1. Flight QF12: Departed from SYD International Airport to LAX International Airport. The delay was due to heavy congestion at LAX, causing a 30-minute delay in landing clearance.

2. Flight LH456: Departed from FRA International Airport to ORD International Airport. The actual departure was delayed by 30 minutes due to undisclosed reasons.

3. Flight BA787: Departed from London Heathrow International Airport (LHR) to Johannesburg International Airport (JNB). The departure was delayed to 18:45 (from 18:00) due to a minor technical issue detected during pre-flight checks.

4. Flight AA101: Departed from JFK International Airport to unknown destination. The flight was delayed to 09:30 (from 08:00) due to severe weather conditions at the departure airport, such as heavy snowfall and strong winds. There was also a delay due to a security screening incident involving a suspicious item. 

Please note that destinations which have on more than one occasion been the cause of flight delays based on the reports are LAX International Airport and JFK International Airport.`
    }

export const report = [
    {
        'graph_data': {
            'data': [
                {
                    'name': 'Number of Delays',
                    'x': [
                        'LAX',
                        'ORD',
                        'JFK',
                        'LAX',
                        'JNB'
                    ],
                    'y': [
                        1,
                        1,
                        1,
                        1,
                        1
                    ],
                    'type': 'bar'
                }
            ],
            'layout': {
                'template': {
                    'data': {
                        'histogram2dcontour': [
                            {
                                'type': 'histogram2dcontour',
                                'colorbar': {
                                    'outlinewidth': 0,
                                    'ticks': ''
                                },
                                'colorscale': [
                                    [
                                        0,
                                        '#0d0887'
                                    ],
                                    [
                                        0.1111111111111111,
                                        '#46039f'
                                    ],
                                    [
                                        0.2222222222222222,
                                        '#7201a8'
                                    ],
                                    [
                                        0.3333333333333333,
                                        '#9c179e'
                                    ],
                                    [
                                        0.4444444444444444,
                                        '#bd3786'
                                    ],
                                    [
                                        0.5555555555555556,
                                        '#d8576b'
                                    ],
                                    [
                                        0.6666666666666666,
                                        '#ed7953'
                                    ],
                                    [
                                        0.7777777777777778,
                                        '#fb9f3a'
                                    ],
                                    [
                                        0.8888888888888888,
                                        '#fdca26'
                                    ],
                                    [
                                        1,
                                        '#f0f921'
                                    ]
                                ]
                            }
                        ],
                        'choropleth': [
                            {
                                'type': 'choropleth',
                                'colorbar': {
                                    'outlinewidth': 0,
                                    'ticks': ''
                                }
                            }
                        ],
                        'histogram2d': [
                            {
                                'type': 'histogram2d',
                                'colorbar': {
                                    'outlinewidth': 0,
                                    'ticks': ''
                                },
                                'colorscale': [
                                    [
                                        0,
                                        '#0d0887'
                                    ],
                                    [
                                        0.1111111111111111,
                                        '#46039f'
                                    ],
                                    [
                                        0.2222222222222222,
                                        '#7201a8'
                                    ],
                                    [
                                        0.3333333333333333,
                                        '#9c179e'
                                    ],
                                    [
                                        0.4444444444444444,
                                        '#bd3786'
                                    ],
                                    [
                                        0.5555555555555556,
                                        '#d8576b'
                                    ],
                                    [
                                        0.6666666666666666,
                                        '#ed7953'
                                    ],
                                    [
                                        0.7777777777777778,
                                        '#fb9f3a'
                                    ],
                                    [
                                        0.8888888888888888,
                                        '#fdca26'
                                    ],
                                    [
                                        1,
                                        '#f0f921'
                                    ]
                                ]
                            }
                        ],
                        'heatmap': [
                            {
                                'type': 'heatmap',
                                'colorbar': {
                                    'outlinewidth': 0,
                                    'ticks': ''
                                },
                                'colorscale': [
                                    [
                                        0,
                                        '#0d0887'
                                    ],
                                    [
                                        0.1111111111111111,
                                        '#46039f'
                                    ],
                                    [
                                        0.2222222222222222,
                                        '#7201a8'
                                    ],
                                    [
                                        0.3333333333333333,
                                        '#9c179e'
                                    ],
                                    [
                                        0.4444444444444444,
                                        '#bd3786'
                                    ],
                                    [
                                        0.5555555555555556,
                                        '#d8576b'
                                    ],
                                    [
                                        0.6666666666666666,
                                        '#ed7953'
                                    ],
                                    [
                                        0.7777777777777778,
                                        '#fb9f3a'
                                    ],
                                    [
                                        0.8888888888888888,
                                        '#fdca26'
                                    ],
                                    [
                                        1,
                                        '#f0f921'
                                    ]
                                ]
                            }
                        ],
                        'heatmapgl': [
                            {
                                'type': 'heatmapgl',
                                'colorbar': {
                                    'outlinewidth': 0,
                                    'ticks': ''
                                },
                                'colorscale': [
                                    [
                                        0,
                                        '#0d0887'
                                    ],
                                    [
                                        0.1111111111111111,
                                        '#46039f'
                                    ],
                                    [
                                        0.2222222222222222,
                                        '#7201a8'
                                    ],
                                    [
                                        0.3333333333333333,
                                        '#9c179e'
                                    ],
                                    [
                                        0.4444444444444444,
                                        '#bd3786'
                                    ],
                                    [
                                        0.5555555555555556,
                                        '#d8576b'
                                    ],
                                    [
                                        0.6666666666666666,
                                        '#ed7953'
                                    ],
                                    [
                                        0.7777777777777778,
                                        '#fb9f3a'
                                    ],
                                    [
                                        0.8888888888888888,
                                        '#fdca26'
                                    ],
                                    [
                                        1,
                                        '#f0f921'
                                    ]
                                ]
                            }
                        ],
                        'contourcarpet': [
                            {
                                'type': 'contourcarpet',
                                'colorbar': {
                                    'outlinewidth': 0,
                                    'ticks': ''
                                }
                            }
                        ],
                        'contour': [
                            {
                                'type': 'contour',
                                'colorbar': {
                                    'outlinewidth': 0,
                                    'ticks': ''
                                },
                                'colorscale': [
                                    [
                                        0,
                                        '#0d0887'
                                    ],
                                    [
                                        0.1111111111111111,
                                        '#46039f'
                                    ],
                                    [
                                        0.2222222222222222,
                                        '#7201a8'
                                    ],
                                    [
                                        0.3333333333333333,
                                        '#9c179e'
                                    ],
                                    [
                                        0.4444444444444444,
                                        '#bd3786'
                                    ],
                                    [
                                        0.5555555555555556,
                                        '#d8576b'
                                    ],
                                    [
                                        0.6666666666666666,
                                        '#ed7953'
                                    ],
                                    [
                                        0.7777777777777778,
                                        '#fb9f3a'
                                    ],
                                    [
                                        0.8888888888888888,
                                        '#fdca26'
                                    ],
                                    [
                                        1,
                                        '#f0f921'
                                    ]
                                ]
                            }
                        ],
                        'surface': [
                            {
                                'type': 'surface',
                                'colorbar': {
                                    'outlinewidth': 0,
                                    'ticks': ''
                                },
                                'colorscale': [
                                    [
                                        0,
                                        '#0d0887'
                                    ],
                                    [
                                        0.1111111111111111,
                                        '#46039f'
                                    ],
                                    [
                                        0.2222222222222222,
                                        '#7201a8'
                                    ],
                                    [
                                        0.3333333333333333,
                                        '#9c179e'
                                    ],
                                    [
                                        0.4444444444444444,
                                        '#bd3786'
                                    ],
                                    [
                                        0.5555555555555556,
                                        '#d8576b'
                                    ],
                                    [
                                        0.6666666666666666,
                                        '#ed7953'
                                    ],
                                    [
                                        0.7777777777777778,
                                        '#fb9f3a'
                                    ],
                                    [
                                        0.8888888888888888,
                                        '#fdca26'
                                    ],
                                    [
                                        1,
                                        '#f0f921'
                                    ]
                                ]
                            }
                        ],
                        'mesh3d': [
                            {
                                'type': 'mesh3d',
                                'colorbar': {
                                    'outlinewidth': 0,
                                    'ticks': ''
                                }
                            }
                        ],
                        'scatter': [
                            {
                                'fillpattern': {
                                    'fillmode': 'overlay',
                                    'size': 10,
                                    'solidity': 0.2
                                },
                                'type': 'scatter'
                            }
                        ],
                        'parcoords': [
                            {
                                'type': 'parcoords',
                                'line': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                }
                            }
                        ],
                        'scatterpolargl': [
                            {
                                'type': 'scatterpolargl',
                                'marker': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                }
                            }
                        ],
                        'bar': [
                            {
                                'error_x': {
                                    'color': '#2a3f5f'
                                },
                                'error_y': {
                                    'color': '#2a3f5f'
                                },
                                'marker': {
                                    'line': {
                                        'color': '#E5ECF6',
                                        'width': 0.5
                                    },
                                    'pattern': {
                                        'fillmode': 'overlay',
                                        'size': 10,
                                        'solidity': 0.2
                                    }
                                },
                                'type': 'bar'
                            }
                        ],
                        'scattergeo': [
                            {
                                'type': 'scattergeo',
                                'marker': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                }
                            }
                        ],
                        'scatterpolar': [
                            {
                                'type': 'scatterpolar',
                                'marker': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                }
                            }
                        ],
                        'histogram': [
                            {
                                'marker': {
                                    'pattern': {
                                        'fillmode': 'overlay',
                                        'size': 10,
                                        'solidity': 0.2
                                    }
                                },
                                'type': 'histogram'
                            }
                        ],
                        'scattergl': [
                            {
                                'type': 'scattergl',
                                'marker': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                }
                            }
                        ],
                        'scatter3d': [
                            {
                                'type': 'scatter3d',
                                'line': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                },
                                'marker': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                }
                            }
                        ],
                        'scattermapbox': [
                            {
                                'type': 'scattermapbox',
                                'marker': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                }
                            }
                        ],
                        'scatterternary': [
                            {
                                'type': 'scatterternary',
                                'marker': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                }
                            }
                        ],
                        'scattercarpet': [
                            {
                                'type': 'scattercarpet',
                                'marker': {
                                    'colorbar': {
                                        'outlinewidth': 0,
                                        'ticks': ''
                                    }
                                }
                            }
                        ],
                        'carpet': [
                            {
                                'aaxis': {
                                    'endlinecolor': '#2a3f5f',
                                    'gridcolor': 'white',
                                    'linecolor': 'white',
                                    'minorgridcolor': 'white',
                                    'startlinecolor': '#2a3f5f'
                                },
                                'baxis': {
                                    'endlinecolor': '#2a3f5f',
                                    'gridcolor': 'white',
                                    'linecolor': 'white',
                                    'minorgridcolor': 'white',
                                    'startlinecolor': '#2a3f5f'
                                },
                                'type': 'carpet'
                            }
                        ],
                        'table': [
                            {
                                'cells': {
                                    'fill': {
                                        'color': '#EBF0F8'
                                    },
                                    'line': {
                                        'color': 'white'
                                    }
                                },
                                'header': {
                                    'fill': {
                                        'color': '#C8D4E3'
                                    },
                                    'line': {
                                        'color': 'white'
                                    }
                                },
                                'type': 'table'
                            }
                        ],
                        'barpolar': [
                            {
                                'marker': {
                                    'line': {
                                        'color': '#E5ECF6',
                                        'width': 0.5
                                    },
                                    'pattern': {
                                        'fillmode': 'overlay',
                                        'size': 10,
                                        'solidity': 0.2
                                    }
                                },
                                'type': 'barpolar'
                            }
                        ],
                        'pie': [
                            {
                                'automargin': true,
                                'type': 'pie'
                            }
                        ]
                    },
                    'layout': {
                        'autotypenumbers': 'strict',
                        'colorway': [
                            '#636efa',
                            '#EF553B',
                            '#00cc96',
                            '#ab63fa',
                            '#FFA15A',
                            '#19d3f3',
                            '#FF6692',
                            '#B6E880',
                            '#FF97FF',
                            '#FECB52'
                        ],
                        'font': {
                            'color': '#2a3f5f'
                        },
                        'hovermode': 'closest',
                        'hoverlabel': {
                            'align': 'left'
                        },
                        'paper_bgcolor': 'white',
                        'plot_bgcolor': '#E5ECF6',
                        'polar': {
                            'bgcolor': '#E5ECF6',
                            'angularaxis': {
                                'gridcolor': 'white',
                                'linecolor': 'white',
                                'ticks': ''
                            },
                            'radialaxis': {
                                'gridcolor': 'white',
                                'linecolor': 'white',
                                'ticks': ''
                            }
                        },
                        'ternary': {
                            'bgcolor': '#E5ECF6',
                            'aaxis': {
                                'gridcolor': 'white',
                                'linecolor': 'white',
                                'ticks': ''
                            },
                            'baxis': {
                                'gridcolor': 'white',
                                'linecolor': 'white',
                                'ticks': ''
                            },
                            'caxis': {
                                'gridcolor': 'white',
                                'linecolor': 'white',
                                'ticks': ''
                            }
                        },
                        'coloraxis': {
                            'colorbar': {
                                'outlinewidth': 0,
                                'ticks': ''
                            }
                        },
                        'colorscale': {
                            'sequential': [
                                [
                                    0,
                                    '#0d0887'
                                ],
                                [
                                    0.1111111111111111,
                                    '#46039f'
                                ],
                                [
                                    0.2222222222222222,
                                    '#7201a8'
                                ],
                                [
                                    0.3333333333333333,
                                    '#9c179e'
                                ],
                                [
                                    0.4444444444444444,
                                    '#bd3786'
                                ],
                                [
                                    0.5555555555555556,
                                    '#d8576b'
                                ],
                                [
                                    0.6666666666666666,
                                    '#ed7953'
                                ],
                                [
                                    0.7777777777777778,
                                    '#fb9f3a'
                                ],
                                [
                                    0.8888888888888888,
                                    '#fdca26'
                                ],
                                [
                                    1,
                                    '#f0f921'
                                ]
                            ],
                            'sequentialminus': [
                                [
                                    0,
                                    '#0d0887'
                                ],
                                [
                                    0.1111111111111111,
                                    '#46039f'
                                ],
                                [
                                    0.2222222222222222,
                                    '#7201a8'
                                ],
                                [
                                    0.3333333333333333,
                                    '#9c179e'
                                ],
                                [
                                    0.4444444444444444,
                                    '#bd3786'
                                ],
                                [
                                    0.5555555555555556,
                                    '#d8576b'
                                ],
                                [
                                    0.6666666666666666,
                                    '#ed7953'
                                ],
                                [
                                    0.7777777777777778,
                                    '#fb9f3a'
                                ],
                                [
                                    0.8888888888888888,
                                    '#fdca26'
                                ],
                                [
                                    1,
                                    '#f0f921'
                                ]
                            ],
                            'diverging': [
                                [
                                    0,
                                    '#8e0152'
                                ],
                                [
                                    0.1,
                                    '#c51b7d'
                                ],
                                [
                                    0.2,
                                    '#de77ae'
                                ],
                                [
                                    0.3,
                                    '#f1b6da'
                                ],
                                [
                                    0.4,
                                    '#fde0ef'
                                ],
                                [
                                    0.5,
                                    '#f7f7f7'
                                ],
                                [
                                    0.6,
                                    '#e6f5d0'
                                ],
                                [
                                    0.7,
                                    '#b8e186'
                                ],
                                [
                                    0.8,
                                    '#7fbc41'
                                ],
                                [
                                    0.9,
                                    '#4d9221'
                                ],
                                [
                                    1,
                                    '#276419'
                                ]
                            ]
                        },
                        'xaxis': {
                            'gridcolor': 'white',
                            'linecolor': 'white',
                            'ticks': '',
                            'title': {
                                'standoff': 15
                            },
                            'zerolinecolor': 'white',
                            'automargin': true,
                            'zerolinewidth': 2
                        },
                        'yaxis': {
                            'gridcolor': 'white',
                            'linecolor': 'white',
                            'ticks': '',
                            'title': {
                                'standoff': 15
                            },
                            'zerolinecolor': 'white',
                            'automargin': true,
                            'zerolinewidth': 2
                        },
                        'scene': {
                            'xaxis': {
                                'backgroundcolor': '#E5ECF6',
                                'gridcolor': 'white',
                                'linecolor': 'white',
                                'showbackground': true,
                                'ticks': '',
                                'zerolinecolor': 'white',
                                'gridwidth': 2
                            },
                            'yaxis': {
                                'backgroundcolor': '#E5ECF6',
                                'gridcolor': 'white',
                                'linecolor': 'white',
                                'showbackground': true,
                                'ticks': '',
                                'zerolinecolor': 'white',
                                'gridwidth': 2
                            },
                            'zaxis': {
                                'backgroundcolor': '#E5ECF6',
                                'gridcolor': 'white',
                                'linecolor': 'white',
                                'showbackground': true,
                                'ticks': '',
                                'zerolinecolor': 'white',
                                'gridwidth': 2
                            }
                        },
                        'shapedefaults': {
                            'line': {
                                'color': '#2a3f5f'
                            }
                        },
                        'annotationdefaults': {
                            'arrowcolor': '#2a3f5f',
                            'arrowhead': 0,
                            'arrowwidth': 1
                        },
                        'geo': {
                            'bgcolor': 'white',
                            'landcolor': '#E5ECF6',
                            'subunitcolor': 'white',
                            'showland': true,
                            'showlakes': true,
                            'lakecolor': 'white'
                        },
                        'title': {
                            'x': 0.05
                        },
                        'mapbox': {
                            'style': 'light'
                        }
                    }
                },
                'title': {
                    'text': 'Number of Delays per Destination',
                    'font': {
                        'size': 16
                    }
                },
                'xaxis': {
                    'title': {
                        'text': 'Destination',
                        'font': {
                            'size': 14
                        }
                    },
                    'type': 'category',
                    'range': [
                        -0.5,
                        3.5
                    ],
                    'autorange': true
                },
                'yaxis': {
                    'title': {
                        'text': 'Number of Delays',
                        'font': {
                            'size': 14
                        }
                    },
                    'type': 'linear',
                    'range': [
                        0,
                        2.1052631578947367
                    ],
                    'autorange': true
                },
                'barmode': 'group',
                'margin': {
                    'l': 50,
                    'r': 50,
                    't': 50,
                    'b': 50
                },
                'width': 500,
                'height': 400,
                'legend': {
                    'font': {
                        'size': 12
                    }
                }
            }
        },
        'analysis': 'From the reports, the following data for delayed flights can be gathered:\n\n1. Flight QF12 - Destination: LAX International Airport - Number of delays: 1\n2. Flight LH456 - Destination: ORD International Airport - Number of delays: 1\n3. Flight EK222 - Destination: JFK International Airport - Number of delays: 1\n4. Flight AA101 - Destination: LAX International Airport - Number of delays: 1\n5. Flight BA787 - Destination: Johannesburg International Airport (JNB) - Number of delays: 1\n\nUnfortunately, without the ability to generate graphics, a chart is not available. However, the above listed flights and destinations had 1 instance of delay each according to the reports provided.',
        'id_metric': '6738a0594e520f178befe0cd'
    }
]