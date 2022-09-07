export const Pagination = (props: { 
  statePagination: any,
  onChangePage: any
}) => {

  function changePage(e: any) {
    props.onChangePage(e);
  }

  function next() {
    changePage(props.statePagination.currentPage + 1);
  }

  function prev() {
    changePage(props.statePagination.currentPage - 1);
  }


  function getArray(number: number) {
    let list = [];
    for (let i = 1; i <= number; i++) {
      list.push(i);
    }
    return list;
  }

  return (
    <div className="pagination-container">
      {
        props.statePagination && (
          <>
            <button onClick={() => prev()} className="btn btn-primary" disabled={props.statePagination.currentPage === 1}>
              Prev
            </button>
            <select className="form-input" value={props.statePagination.currentPage} onChange={(e) => changePage(e.target.value)}>
              {
                getArray(props.statePagination.totalPage).map((data, index) => (
                  <option key={index}>{ data }</option>
                ))
              }
            </select>
            <button onClick={() => next()}
              className="btn btn-primary" disabled={props.statePagination.currentPage === props.statePagination.totalPage}>
              Next
            </button>
          </>
        )
      }
    </div>
  )
}
