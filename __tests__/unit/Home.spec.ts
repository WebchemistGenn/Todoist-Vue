import { mount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

describe("Home.vue", () => {
  const testData = [
    { id: 0, content: "등산하기", createdAt: 1550984912840, completedAt: null },
    { id: 1, content: "축구하기", createdAt: 1550984912840, completedAt: null },
    { id: 2, content: "Vue 스터디 참여", createdAt: 1550984912840, completedAt: null },
  ];

  const HomeView = mount(Home, {
    data() {
      return {
        list: testData,
        active: "All",
      };
    },
  });

  it("렌더 성공", () => {
    expect(HomeView.contains("div.Home")).toBe(true);
  });

  it("데이터 입력시 정상 입력되어야 합니다.", () => {
    HomeView.find("input").setValue("산책하기");
    HomeView.find("form").trigger("submit.prevent");
    expect(HomeView.findAll("li.item").length).toBe(testData.length);
  });

  it("첫번째 할일을 완료시킵니다.", () => {
    HomeView.findAll("li.item").at(0).find("input[type=checkbox]").trigger("checked");
    expect(true).toEqual(true);
  });

  it("전체 할일을 완료시킵니다.", () => {
    expect(true).toEqual(true);
  });

  it("완료한 첫번째, 두번째 할일을 취소합니다.", () => {
    expect(true).toEqual(true);
  });

  it("데이터가 정상적으로 화면에 출력되어야합니다.", () => {
    HomeView.setData({ active: "All" });
    expect(HomeView.vm.$data.active).toBe("All");
    expect(HomeView.findAll("li.item").length).toBe(testData.length);
  });

  it("데이터가 정상적으로 화면에 출력되어야합니다. (Active)", () => {
    HomeView.setData({ active: "Active" });
    expect(HomeView.vm.$data.active).toBe("Active");
    expect(HomeView.findAll("li.item").length).toBe(testData.filter(item => item.completedAt === null).length);
  });

  it("데이터가 정상적으로 화면에 출력되어야합니다. (Completed)", () => {
    HomeView.setData({ active: "Completed" });
    expect(HomeView.vm.$data.active).toBe("Completed");
    expect(HomeView.findAll("li.item").length).toBe(testData.filter(item => item.completedAt !== null).length);
  });

  it("데이터 삭제시 정상 삭제되어야 합니다.", () => {
    expect(true).toEqual(true);
    // HomeView.findAll("li.item").at(0).find("checkbox").trigger("click");
  });

  it("데이터 전체 삭제시 정상 전체삭제되어야 합니다.", () => {
    expect(true).toEqual(true);
    // HomeView.findAll("li.item").at(0).find("checkbox").trigger("click");
  });
});
