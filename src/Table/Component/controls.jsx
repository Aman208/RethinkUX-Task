export default function ContextMenu(props) {
    return (
      <div id="content">
        <div id="horz-list">
          <ul>
            <ul>
              <li>
                <a
                  onClick={() => {
                    props.AddRowUp();
                  }}
                >
                  Add Row Up
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    props.AddRowDown();
                  }}
                >
                  Add Row Down
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    props.AddRowUp();
                  }}
                >
                  Add Columnn Left
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    props.AddRowUp();
                  }}
                >
                  Add Column Right
                </a>
              </li>
              <li>
                <a
                  className="temp"
                  onClick={() => {
                    props.AddRowUp();
                  }}
                >
                  Add Row Up
                </a>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    );
  }