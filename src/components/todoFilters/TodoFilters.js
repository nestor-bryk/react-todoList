import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { activeFilterChanged, filtersFetching, filtersFetched  } from "./todoFiltersSlice";
import { useHttp } from "../../hooks/http.hook";
import classNames from "classnames";

import "./todoFilters.scss";


const TodoFilters = () => {

    const {filters, activeFilter} = useSelector(state => state.filter)

    const { request } = useHttp();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filtersFetching());
        request('http://localhost:3001/filters')
            .then(data => dispatch(filtersFetched(data)))

        // eslint-disable-next-line
    }, []);

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5>Фільтри не знайдені!</h5>
        }

        return arr.map(({name, label, className}) => {

            const btnClass = classNames('btn', className, {
                'active' : name === activeFilter
            })

            return <button 
                        key={name}
                        name={name}
                        className={btnClass}
                        onClick={() => dispatch(activeFilterChanged(name))}
                    >{label}</button>
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className="filter">
            {elements}
        </div>
    )
}

export default TodoFilters;