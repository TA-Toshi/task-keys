import { useState } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [getId, setId] = useState(-1);

    function Key(event: any) {
        if (event.target.value != '') {
            if (event.key == `Enter`) {
                props.initialData[getId - 1].name = event.target.value;
                setId(-1);
            } else if (event.key == `Escape`) {
                setId(-1);
            }
        }
    }

    function DataSort() {
        if (props.sorting == 'ASC') {
            props.initialData.sort((a: IItem, b: IItem) => {
                if (a.id < b.id) {
                    return -1;
                }
                if (a.id > b.id) {
                    return 1;
                }
                return 0;
            });
        } else {
            props.initialData.sort((a: IItem, b: IItem) => {
                if (a.id > b.id) {
                    return -1;
                }
                if (a.id < b.id) {
                    return 1;
                }
                return 0;
            });
        }
        return (
            <div>
                {props.initialData.map((item: IItem) => {
                    if (getId != item.id) {
                        return (
                            <div
                                key={item.id}
                                onClick={() => {
                                    setId(item.id);
                                }}
                            >
                                {item.name}
                            </div>
                        );
                    } else {
                        return (
                            <input
                                key={item.id}
                                onKeyUp={(event) => {
                                    Key(event);
                                }}
                                type="text"
                                defaultValue={item.name}
                            />
                        );
                    }
                })}
            </div>
        );
    }

    return <div>{DataSort()}</div>;
}
