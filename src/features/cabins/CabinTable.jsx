
import styled from "styled-components";
import PropTypes from "prop-types";
import EditCabin from "./EditCabin";
import DeleteCabin from "./DeleteCabin";
import {
  StyledTable,
  ButtonGroup,
} from "../../styles/TableStyles";
import Empty from "../../ui/Empty";

export const StyledTableHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1.5fr 2fr;
  column-gap: 1.2rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 1rem;
  text-align: center;
  margin: 0;
`;

export const StyleTableContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1.5fr 2fr;
  column-gap: 1.2rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  color: var(--color-grey-600);
  padding: 0rem 1rem;
  text-align: center;
  margin: 0;
`;
const ImageCell = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const CabinImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

function Table({ cabins }) {
  return (
    <StyledTable>
      <StyledTableHeader>
        <div>ROOM</div>
        <div>CABIN</div>
        <div>CAPACITY</div>
        <div>PRICE</div>
        <div>DISCOUNT</div>
        <div>ACTION</div>
      </StyledTableHeader>

      {Array.isArray(cabins) && cabins.length === 0 ? (
        <Empty datatype="cabins" />
      ) : (
        cabins.map((cabin) => (
          <StyleTableContent key={cabin.documentId}>
            <ImageCell>
              {cabin.image && cabin.image.url ? (
                <CabinImage
                  src={`http://localhost:1337${cabin.image.url}`}
                  alt={cabin.image.name}
                />
              ) : (
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "#f0f0f0",
                  }}
                />
              )}
            </ImageCell>
            <div>{cabin.name}</div>
            <div style={{ whiteSpace: "nowrap" }}>
              Up to {cabin.maxCapacity} guests
            </div>
            <div>${cabin.regularPrice}</div>
            {cabin.discount ? (
              <div style={{ color: "green" }}>${cabin.discount}</div>
            ) : (
              <span>&mdash;</span>
            )}

            <ButtonGroup>
              <DeleteCabin cabin={cabin} />
              <EditCabin cabin={cabin} />
            </ButtonGroup>
          </StyleTableContent>
        ))
      )}
    </StyledTable>
  );
}
Table.propTypes = {
  cabins: PropTypes.array.isRequired,
};

export default Table;
